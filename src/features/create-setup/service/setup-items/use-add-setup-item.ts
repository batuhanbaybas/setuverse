import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addSetupItemFn } from '../../server/setup-item/add-setup-item.functions'
import type { AddSetupItemInput } from '../../server/setup-item/add-setup-item.functions'
import type { SetupItem } from '../../lib/setup-item'

const useAddSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AddSetupItemInput) => addSetupItemFn({ data: input }),
    onMutate: (input: AddSetupItemInput) => {
      const previousItems = queryClient.getQueryData(['setup-item', setupId])
      console.log({ previousItems })
      queryClient.setQueryData(['setup-item', setupId], (old: SetupItem[]) => {
        console.log({ old })
        return [...old, input]
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
    onSettled: (data, error, __, context) => {
      console.log({ data, error, context })
      if (error) {
        if (context?.previousItems) {
          queryClient.setQueryData(['setup-item', setupId], context.previousItems)
        }
      }
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['setup-item', setupId],
        })
        queryClient.invalidateQueries({ queryKey: ['setup-draft', setupId] })
      }
    },
  })
}

export default useAddSetupItem
