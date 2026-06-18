import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/features/profile/lib/query-keys'

import type {
  UpdateProfileInput,
  UpdateProfileResult,
} from '../server/update-profile.functions'
import { updateProfileFn } from '../server/update-profile.functions'

const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation<UpdateProfileResult, Error, UpdateProfileInput>({
    mutationKey: [queryKeys.updateProfile],
    mutationFn: (input) => updateProfileFn({ data: input }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.getProfile] })
    },
  })
}

export default useUpdateProfile
