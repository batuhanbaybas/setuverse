import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { updateSetupItemFn } from '../server/update-setup-item.functions'
import type { UpdateSetupItemInput } from '../server/update-setup-item.functions'

const useUpdateSetupItem = (setupId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [queryKeys.updateSetupItem],
    mutationFn: (input: UpdateSetupItemInput) =>
      updateSetupItemFn({ data: input }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getSetupDraft, setupId],
      })
    },
  })
}

export default useUpdateSetupItem
