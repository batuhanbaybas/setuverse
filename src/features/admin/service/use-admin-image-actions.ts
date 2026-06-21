import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/features/admin/lib/query-keys'

import { adminDeleteImageFn } from '../server/admin-image-actions.functions'
import type { AdminDeleteImageInput } from '../server/admin-image-actions.functions'

export function useAdminDeleteImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [queryKeys.adminDeleteImage],
    mutationFn: (input: AdminDeleteImageInput) =>
      adminDeleteImageFn({ data: input }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.getAdminImages] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.getAdminSetups] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.getAdminOverview] }),
      ])
    },
  })
}
