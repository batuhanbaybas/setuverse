import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys as homeQueryKeys } from '#/features/home/lib/query-keys'

import { queryKeys } from '../lib/query-keys'
import { deleteUserSetupFn } from '../server/delete-user-setup.functions'
import type { UserSetupIdInput } from '../server/lib/user-setup-input-schemas'

const useDeleteUserSetup = () => {
  const queryClient = useQueryClient()
  const deleteUserSetup = useServerFn(deleteUserSetupFn)

  return useMutation({
    mutationKey: [queryKeys.deleteUserSetup],
    mutationFn: (input: UserSetupIdInput) =>
      deleteUserSetup({ data: input }),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getProfileSetup],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getProfileStats],
        }),
        queryClient.invalidateQueries({
          queryKey: [homeQueryKeys.getPublishedSetups],
        }),
        queryClient.invalidateQueries({
          queryKey: ['get-setup-detail', variables.setupId],
        }),
      ])
    },
  })
}

export default useDeleteUserSetup
