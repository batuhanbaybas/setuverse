import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { queryKeys } from '../lib/query-keys'
import triggerLikeSetup from '../server/trigger-like-setup'
import { useSession } from '#/features/auth/lib/auth-client'

const useTriggerLikeSetup = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const triggerLikeSetupFn = useServerFn(triggerLikeSetup)
  return useMutation({
    mutationFn: ({ setupId }: { setupId: string }) =>
      triggerLikeSetupFn({ data: { setupId, userId: session?.user.id ?? '' } }),
    onMutate: async ({ setupId }) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.getPublishedSetups],
      })
      const previousSetups = queryClient.getQueryData([
        queryKeys.getPublishedSetups,
      ])
      queryClient.setQueryData([queryKeys.getPublishedSetups], (old: any) =>
        old.map((setup: any) =>
          setup.id === setupId
            ? { ...setup, likes: [...setup.likes, { id: setupId }] }
            : setup,
        ),
      )
      return { previousSetups }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [queryKeys.getPublishedSetups],
        context?.previousSetups,
      )
    },
  })
}
export default useTriggerLikeSetup
