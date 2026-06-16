import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { deleteSetupItemFn } from '../server/delete-setup-item.functions'

const useDeleteSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [queryKeys.deleteSetupItem],
    mutationFn: (itemId: string) => deleteSetupItemFn({ data: { itemId } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getSetupDraft, setupId],
      })
    },
  })
}

export default useDeleteSetupItem
