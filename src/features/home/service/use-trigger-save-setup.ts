import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { useSession } from '#/features/auth/lib/auth-client'
import { queryKeys as profileQueryKeys } from '#/features/profile/lib/query-keys'

import { queryKeys } from '../lib/query-keys'
import triggerSaveSetup from '../server/trigger-save-setup'

type SaveStatusCache = {
  isSaved: boolean
}

const useTriggerSaveSetup = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const triggerSaveSetupFn = useServerFn(triggerSaveSetup)

  return useMutation({
    mutationFn: ({ setupId }: { setupId: string }) => {
      const userId = session?.user.id

      if (!userId) {
        throw new Error('You must be signed in to save a setup')
      }

      return triggerSaveSetupFn({ data: { setupId } })
    },
    onMutate: async ({ setupId }) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.getCurrentUserSaveStatus, setupId],
      })

      const previousSaveStatus = queryClient.getQueryData<SaveStatusCache>([
        queryKeys.getCurrentUserSaveStatus,
        setupId,
      ])

      const userId = session?.user.id

      if (!userId) {
        return { previousSaveStatus, setupId }
      }

      const nextSaved = !(previousSaveStatus?.isSaved ?? false)

      queryClient.setQueryData<SaveStatusCache>(
        [queryKeys.getCurrentUserSaveStatus, setupId],
        {
          isSaved: nextSaved,
        },
      )

      return { previousSaveStatus, setupId }
    },
    onError: (_, __, context) => {
      if (context?.setupId) {
        queryClient.setQueryData(
          [queryKeys.getCurrentUserSaveStatus, context.setupId],
          context.previousSaveStatus,
        )
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getCurrentUserSaveStatus, variables.setupId],
      })
      queryClient.invalidateQueries({
        queryKey: [profileQueryKeys.getProfileSavedSetups],
      })
      queryClient.invalidateQueries({
        queryKey: [profileQueryKeys.getProfileStats],
      })
    },
  })
}

export default useTriggerSaveSetup
