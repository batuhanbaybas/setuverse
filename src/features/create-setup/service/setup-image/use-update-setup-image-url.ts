import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import { updateSetupImageUrlFn } from '../../server/update-setup-image-url.functions'
import type { UpdateSetupImageUrlInput } from '../../server/update-setup-image-url.functions'

const useUpdateSetupImageUrl = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [queryKeys.updateSetupImageUrl],
    mutationFn: (input: UpdateSetupImageUrlInput) =>
      updateSetupImageUrlFn({ data: input }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getSetupDraft, setupId],
      })
    },
  })
}

export default useUpdateSetupImageUrl
