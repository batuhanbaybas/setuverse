import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import { updateSetupItemFn } from '../../server/setup-item/update-setup-item.functions'
import type { UpdateSetupItemInput } from '../../server/setup-item/update-setup-item.functions'
import type { SetupItem } from '../../lib/setup-item'

const getSetupItemsQueryKey = (setupId: string) =>
  ['setup-item', setupId] as const

const useUpdateSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()
  const itemsQueryKey = getSetupItemsQueryKey(setupId)

  return useMutation({
    mutationKey: [queryKeys.updateSetupItem],
    mutationFn: (input: UpdateSetupItemInput) =>
      updateSetupItemFn({ data: input }),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: itemsQueryKey })

      const previousItems =
        queryClient.getQueryData<SetupItem[]>(itemsQueryKey)

      const { itemId, ...updates } = input

      queryClient.setQueryData<SetupItem[]>(itemsQueryKey, (items: SetupItem[]) =>
        items.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item,
        ),
      )

      return { previousItems }
    },
    onError: (_, __, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(itemsQueryKey, context.previousItems)
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itemsQueryKey })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.getSetupDraft(setupId),
      })
    },
  })
}

export default useUpdateSetupItem
