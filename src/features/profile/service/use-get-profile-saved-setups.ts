import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { queryKeys } from '../lib/query-keys'
import { getProfileSavedSetupsFn } from '../server/get-profile-saved-setups'
import type { SavedSetup } from '../server/get-profile-saved-setups'

const useGetProfileSavedSetups = (): UseQueryResult<SavedSetup[], Error> => {
  const getProfileSavedSetups = useServerFn(getProfileSavedSetupsFn)

  return useQuery<SavedSetup[], Error>({
    queryKey: [queryKeys.getProfileSavedSetups],
    queryFn: getProfileSavedSetups,
  })
}

export default useGetProfileSavedSetups
