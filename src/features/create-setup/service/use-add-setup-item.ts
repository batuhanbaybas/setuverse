import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { addSetupItemFn } from '../server/add-setup-item.functions'
import type { AddSetupItemInput } from '../server/add-setup-item.functions'

const useAddSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [queryKeys.addSetupItem],
    mutationFn: (input: AddSetupItemInput) => addSetupItemFn({ data: input }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getSetupDraft, setupId],
      })
    },
  })
}

export default useAddSetupItem
