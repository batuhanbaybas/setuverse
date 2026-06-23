import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/features/create-setup/lib/query-keys'

import { getSetupDraftFn } from '../server/get-setup-draft.functions'
import { useServerFn } from '@tanstack/react-start'

const useGetSetupDraft = (
  setupId: string,
  options?: { enabled?: boolean },
) => {
  const getSetupDraft = useServerFn(getSetupDraftFn)
  return useQuery({
    queryKey: [queryKeys.getSetupDraft, setupId],
    queryFn: () => getSetupDraft({ data: { setupId } }),
    enabled: options?.enabled ?? Boolean(setupId),
  })
}

export default useGetSetupDraft
