import type { InfiniteData } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { useSession } from '#/features/auth/lib/auth-client'

import { queryKeys } from '../lib/query-keys'
import triggerLikeSetup from '../server/trigger-like-setup'
import type { GetPublishedSetupsResult } from '../server/get-published-setups.functions'
import { queryKeys as profileQueryKeys } from '#/features/profile/lib/query-keys'

const publishedSetupsQueryKey = [queryKeys.getPublishedSetups] as const

type LikeStatusCache = {
  isLiked: boolean
  likesCount: number
}

const useTriggerLikeSetup = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const triggerLikeSetupFn = useServerFn(triggerLikeSetup)

  return useMutation({
    mutationFn: ({ setupId }: { setupId: string }) => {
      const userId = session?.user.id

      if (!userId) {
        throw new Error('You must be signed in to like a setup')
      }

      return triggerLikeSetupFn({ data: { setupId } })
    },
    onMutate: async ({ setupId }) => {
      await queryClient.cancelQueries({
        queryKey: publishedSetupsQueryKey,
      })
      await queryClient.cancelQueries({
        queryKey: [queryKeys.getCurrentUserLikeStatus, setupId],
      })

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetPublishedSetupsResult>
      >({ queryKey: publishedSetupsQueryKey })

      const previousLikeStatus = queryClient.getQueryData<LikeStatusCache>([
        queryKeys.getCurrentUserLikeStatus,
        setupId,
      ])

      const userId = session?.user.id

      if (!userId) {
        return { previousQueries, previousLikeStatus, setupId }
      }

      const currentlyLiked = previousLikeStatus?.isLiked ?? false
      const nextLiked = !currentlyLiked
      const nextCount = Math.max(
        0,
        (previousLikeStatus?.likesCount ?? 0) + (nextLiked ? 1 : -1),
      )

      queryClient.setQueryData<LikeStatusCache>(
        [queryKeys.getCurrentUserLikeStatus, setupId],
        {
          isLiked: nextLiked,
          likesCount: nextCount,
        },
      )

      queryClient.setQueriesData<InfiniteData<GetPublishedSetupsResult>>(
        { queryKey: publishedSetupsQueryKey },
        (old: InfiniteData<GetPublishedSetupsResult> | undefined) => {
          if (!old) {
            return old
          }

          return {
            ...old,
            pages: old.pages.map((page: GetPublishedSetupsResult) => ({
              ...page,
              setups: page.setups.map((setup) => {
                if (setup.id !== setupId) {
                  return setup
                }

                const hasUserLike = setup.likes.some(
                  (like: { userId: string }) => like.userId === userId,
                )

                if (nextLiked) {
                  return hasUserLike
                    ? setup
                    : {
                        ...setup,
                        likes: [
                          ...setup.likes,
                          {
                            userId,
                            setupId,
                            createdAt: new Date(),
                          },
                        ],
                      }
                }

                return {
                  ...setup,
                  likes: setup.likes.filter(
                    (like: { userId: string }) => like.userId !== userId,
                  ),
                }
              }),
            })),
          }
        },
      )

      return { previousQueries, previousLikeStatus, setupId }
    },
    onError: (_, __, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })

      if (context?.setupId) {
        queryClient.setQueryData(
          [queryKeys.getCurrentUserLikeStatus, context.setupId],
          context.previousLikeStatus,
        )
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: publishedSetupsQueryKey,
      })
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getCurrentUserLikeStatus, variables.setupId],
      })
      queryClient.invalidateQueries({
        queryKey: [profileQueryKeys.getProfileLikedSetups],
      })
    },
  })
}

export default useTriggerLikeSetup
