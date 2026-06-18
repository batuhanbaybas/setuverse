import { useMutation } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import { publishSetupFn } from '../server/publish-setup.functions'
import type { PublishSetupInput } from '../server/publish-setup.functions'

const usePublishSetup = () => {
  return useMutation({
    mutationKey: [queryKeys.publishSetup],
    mutationFn: (input: PublishSetupInput) => publishSetupFn({ data: input }),
  })
}

export default usePublishSetup
