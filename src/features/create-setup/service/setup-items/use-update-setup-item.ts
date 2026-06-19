import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import { updateSetupItemFn } from '../../server/setup-item/update-setup-item.functions'
import type { UpdateSetupItemInput } from '../../server/setup-item/update-setup-item.functions'
import type { SetupItem } from '../../lib/setup-item'

const useUpdateSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateSetupItemInput) =>
      updateSetupItemFn({ data: input }),
    onMutate: (input: UpdateSetupItemInput) => {
      const previousItems = queryClient.getQueryData(['get-setup-items', setupId])
      queryClient.setQueryData(['get-setup-items', setupId], (old: SetupItem[]) => old.map((item) => item.id === input.itemId ? { ...item, ...input } : item))
      return { previousItems }
    },
    onError: (_, __, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['get-setup-items', setupId], context.previousItems)
      }
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getSetupDraft, setupId],
      })
    },
  })
}

export default useUpdateSetupItem
