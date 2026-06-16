import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { getSetupDraftFn } from '../server/get-setup-draft.functions'

const useGetSetupDraft = (setupId: string) => {
  return useQuery({
    queryKey: [queryKeys.getSetupDraft, setupId],
    queryFn: () => getSetupDraftFn({ data: { setupId } }),
    enabled: Boolean(setupId),
  })
}

export default useGetSetupDraft
