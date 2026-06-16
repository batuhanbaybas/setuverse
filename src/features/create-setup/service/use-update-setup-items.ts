import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import type {
  UpdateSetupItemsInput,
  UpdateSetupItemsResult,
} from '../server/update-setup-items.functions'
import { updateSetupItemsFn } from '../server/update-setup-items.functions'

const useUpdateSetupItems = () => {
  const queryClient = useQueryClient()

  return useMutation<UpdateSetupItemsResult, Error, UpdateSetupItemsInput>({
    mutationKey: [queryKeys.updateSetupItems],
    mutationFn: (input) => updateSetupItemsFn({ data: input }),
    onSuccess: (_result, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getSetupDraft, variables.setupId],
      })
    },
  })
}

export default useUpdateSetupItems
