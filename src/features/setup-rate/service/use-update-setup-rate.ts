import type { InfiniteData } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { useSession } from '#/features/auth/lib/auth-client'
import { queryKeys as homeQueryKeys } from '#/features/home/lib/query-keys'
import type { GetPublishedSetupsResult } from '#/features/home/server/get-published-setups.functions'
import { queryKeys as profileQueryKeys } from '#/features/profile/lib/query-keys'
import type { LikedSetup } from '#/features/profile/server/get-profile-liked-setups'
import type { SavedSetup } from '#/features/profile/server/get-profile-saved-setups'

import {
  applyRateStatsToPublishedSetups,
  applyRateStatsToSetupList,
  findSetupRateStatsInPublishedQueries,
} from '../lib/apply-setup-rate-stats'
import { computeOptimisticRateStats } from '../lib/compute-optimistic-rate-stats'
import { queryKeys } from '../lib/query-keys'
import type { GetCurrentUserRateStatusResult } from '../server/get-current-user-rate-status'
import updateSetupRate from '../server/update-setup-rate'

const publishedSetupsQueryKey = [homeQueryKeys.getPublishedSetups] as const

type UpdateSetupRateVariables = {
  setupId: string
  rate: number
}

const useUpdateSetupRate = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const updateSetupRateFn = useServerFn(updateSetupRate)

  return useMutation({
    mutationFn: ({ setupId, rate }: UpdateSetupRateVariables) => {
      const userId = session?.user.id

      if (!userId) {
        throw new Error('You must be signed in to rate a setup')
      }

      return updateSetupRateFn({ data: { setupId, rate } })
    },
    onMutate: async ({ setupId, rate }) => {
      await queryClient.cancelQueries({
        queryKey: publishedSetupsQueryKey,
      })
      await queryClient.cancelQueries({
        queryKey: [queryKeys.getCurrentUserRateStatus, setupId],
      })

      const previousPublishedQueries = queryClient.getQueriesData<
        InfiniteData<GetPublishedSetupsResult>
      >({ queryKey: publishedSetupsQueryKey })

      const previousLikedSetups = queryClient.getQueryData<LikedSetup[]>([
        profileQueryKeys.getProfileLikedSetups,
      ])

      const previousSavedSetups = queryClient.getQueryData<SavedSetup[]>([
        profileQueryKeys.getProfileSavedSetups,
      ])

      const previousRateStatus =
        queryClient.getQueryData<GetCurrentUserRateStatusResult>([
          queryKeys.getCurrentUserRateStatus,
          setupId,
        ])

      const userId = session?.user.id

      if (!userId) {
        return {
          previousPublishedQueries,
          previousLikedSetups,
          previousSavedSetups,
          previousRateStatus,
          setupId,
        }
      }

      const publishedSetupStats = findSetupRateStatsInPublishedQueries(
        previousPublishedQueries,
        setupId,
      )

      const nextStats = computeOptimisticRateStats({
        previousAverage:
          previousRateStatus?.averageRate ?? publishedSetupStats?.averageRate,
        previousCount:
          previousRateStatus?.ratingsCount ?? publishedSetupStats?.ratingsCount,
        previousUserRate: previousRateStatus?.rate ?? null,
        nextRate: rate,
      })

      queryClient.setQueryData<GetCurrentUserRateStatusResult>(
        [queryKeys.getCurrentUserRateStatus, setupId],
        {
          rate,
          averageRate: nextStats.averageRate,
          ratingsCount: nextStats.ratingsCount,
        },
      )

      queryClient.setQueriesData<InfiniteData<GetPublishedSetupsResult>>(
        { queryKey: publishedSetupsQueryKey },
        (old: InfiniteData<GetPublishedSetupsResult> | undefined) =>
          applyRateStatsToPublishedSetups(old, setupId, nextStats),
      )

      if (previousLikedSetups) {
        queryClient.setQueryData<LikedSetup[]>(
          [profileQueryKeys.getProfileLikedSetups],
          applyRateStatsToSetupList(previousLikedSetups, setupId, nextStats),
        )
      }

      if (previousSavedSetups) {
        queryClient.setQueryData<SavedSetup[]>(
          [profileQueryKeys.getProfileSavedSetups],
          applyRateStatsToSetupList(previousSavedSetups, setupId, nextStats),
        )
      }

      return {
        previousPublishedQueries,
        previousLikedSetups,
        previousSavedSetups,
        previousRateStatus,
        setupId,
      }
    },
    onError: (_, __, context) => {
      context?.previousPublishedQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })

      if (context?.previousLikedSetups) {
        queryClient.setQueryData(
          [profileQueryKeys.getProfileLikedSetups],
          context.previousLikedSetups,
        )
      }

      if (context?.previousSavedSetups) {
        queryClient.setQueryData(
          [profileQueryKeys.getProfileSavedSetups],
          context.previousSavedSetups,
        )
      }

      if (context?.setupId) {
        queryClient.setQueryData(
          [queryKeys.getCurrentUserRateStatus, context.setupId],
          context.previousRateStatus,
        )
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: publishedSetupsQueryKey,
      })
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getCurrentUserRateStatus, variables.setupId],
      })
      queryClient.invalidateQueries({
        queryKey: [profileQueryKeys.getProfileLikedSetups],
      })
      queryClient.invalidateQueries({
        queryKey: [profileQueryKeys.getProfileSavedSetups],
      })
    },
  })
}

export default useUpdateSetupRate
