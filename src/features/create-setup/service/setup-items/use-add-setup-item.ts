import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addSetupItemFn } from '../../server/setup-item/add-setup-item.functions'
import type { AddSetupItemInput } from '../../server/setup-item/add-setup-item.functions'
import type { SetupItem } from '../../lib/setup-item'

const useAddSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AddSetupItemInput) => addSetupItemFn({ data: input }),
    onMutate: async (input: AddSetupItemInput) => {
      await queryClient.cancelQueries({ queryKey: ['setup-item', setupId] })

      const previousItems = queryClient.getQueryData<SetupItem[]>([
        'setup-item',
        setupId,
      ])

      queryClient.setQueryData<SetupItem[]>(['setup-item', setupId], (old) => [
        ...(old ?? []),
        {
          id: `temp-${Date.now()}`,
          name: input.name,
          url: input.url,
          x: input.x,
          y: input.y,
        },
      ])

      return { previousItems }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<SetupItem[]>(['setup-item', setupId], (old) => {
        const items = (old ?? []).filter((item) => !item.id.startsWith('temp-'))
        if (items.some((item) => item.id === data.id)) {
          return items
        }
        return [...items, data]
      })
    },
    onError: (_, __, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['setup-item', setupId], context.previousItems)
      }
    },
    onSettled: (data, error, __, context) => {
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
        queryClient.invalidateQueries({
          queryKey: ['get-setup-detail', setupId],
        })
      }
    },
  })
}

export default useAddSetupItem
