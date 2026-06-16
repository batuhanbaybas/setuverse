import { useMutation } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import type { CreateSetupInput, CreateSetupResult } from '../server/create-setup.functions'
import { createSetupFn } from '../server/create-setup.functions'

const useCreateSetup = () => {
  return useMutation<CreateSetupResult, Error, CreateSetupInput>({
    mutationKey: [queryKeys.createSetup],
    mutationFn: (input) => createSetupFn({ data: input }),
  })
}

export default useCreateSetup
