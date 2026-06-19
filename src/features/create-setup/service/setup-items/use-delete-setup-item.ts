import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteSetupItemFn } from '../../server/setup-item/delete-setup-item.functions'

const useDeleteSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) => deleteSetupItemFn({ data: { itemId } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['setup-item', setupId],
      })
    },
  })
}

export default useDeleteSetupItem
