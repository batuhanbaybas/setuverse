import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys as homeQueryKeys } from '#/features/home/lib/query-keys'
import { queryKeys as profileQueryKeys } from '#/features/profile/lib/query-keys'

import { setupEditQueryKeys } from '../lib/query-keys'
import { updatePublishedSetupInfoFn } from '../server/update-published-setup-info.functions'
import type {
  UpdatePublishedSetupInfoInput,
  UpdatePublishedSetupInfoResult,
} from '../server/update-published-setup-info.functions'

const useUpdatePublishedSetupInfo = () => {
  const queryClient = useQueryClient()
  const updatePublishedSetupInfo = useServerFn(updatePublishedSetupInfoFn)

  return useMutation<
    UpdatePublishedSetupInfoResult,
    Error,
    UpdatePublishedSetupInfoInput
  >({
    mutationKey: [setupEditQueryKeys.updatePublishedSetupInfo],
    mutationFn: (input) => updatePublishedSetupInfo({ data: input }),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: setupEditQueryKeys.getSetupForEdit(variables.setupId),
        }),
        queryClient.invalidateQueries({
          queryKey: ['get-setup-detail', variables.setupId],
        }),
        queryClient.invalidateQueries({
          queryKey: [profileQueryKeys.getProfileSetup],
        }),
        queryClient.invalidateQueries({
          queryKey: [homeQueryKeys.getPublishedSetups],
        }),
      ])
    },
  })
}

export default useUpdatePublishedSetupInfo
