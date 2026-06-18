import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/features/profile/lib/query-keys'

import type {
  UpdateProfileInput,
  UpdateProfileResult,
} from '../server/update-profile.functions'
import { updateProfileFn } from '../server/update-profile.functions'
import { useServerFn } from '@tanstack/react-start'

const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  const updateProfile = useServerFn(updateProfileFn)
  return useMutation<UpdateProfileResult, Error, UpdateProfileInput>({
    mutationKey: [queryKeys.updateProfile],
    mutationFn: (input) => updateProfile({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.getProfile] })
    },
  })
}

export default useUpdateProfile
