import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteSetupItemFn } from '../../server/setup-item/delete-setup-item.functions'
import type { SetupItem } from '../../lib/setup-item'

const useDeleteSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) => deleteSetupItemFn({ data: { itemId } }),
    onMutate: (itemId: string) => {
      const previousItems = queryClient.getQueryData(['setup-item', setupId])
      queryClient.setQueryData(['setup-item', setupId], (old: SetupItem[]) => {
        return old.filter((item) => item.id !== itemId)
      })
      return {
        previousItems,
      }
    },
    onError: (_, __, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['setup-item', setupId], context.previousItems)
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['setup-item', setupId],
      })
      void queryClient.invalidateQueries({
        queryKey: ['setup-draft', setupId],
      })
    },
  })
}

export default useDeleteSetupItem
