import { useMutation } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import type {
  UpdateSetupInfoInput,
  UpdateSetupInfoResult,
} from '../server/update-setup-info.functions'
import { updateSetupInfoFn } from '../server/update-setup-info.functions'

const useUpdateSetupInfo = () => {
  return useMutation<UpdateSetupInfoResult, Error, UpdateSetupInfoInput>({
    mutationKey: [queryKeys.updateSetupInfo],
    mutationFn: (input) => updateSetupInfoFn({ data: input }),
  })
}

export default useUpdateSetupInfo
