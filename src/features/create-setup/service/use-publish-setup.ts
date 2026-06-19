import { useMutation } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import { publishSetupFn } from '../server/publish-setup.functions'
import type { PublishSetupInput } from '../server/publish-setup.functions'
import { useServerFn } from '@tanstack/react-start'

const usePublishSetup = () => {
  const publishSetup = useServerFn(publishSetupFn)
  return useMutation({
    mutationKey: [queryKeys.publishSetup],
    mutationFn: (input: PublishSetupInput) => publishSetup({ data: input }),
  })
}

export default usePublishSetup
