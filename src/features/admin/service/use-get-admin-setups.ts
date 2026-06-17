import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { adminQueryStaleTime } from '../lib/admin-query-options'
import type { GetAdminSetupsResult } from '../server/get-admin-setups.functions'
import { getAdminSetupsFn } from '../server/get-admin-setups.functions'

const useGetAdminSetups = (enabled = true) => {
  return useQuery<GetAdminSetupsResult, Error>({
    queryKey: [queryKeys.getAdminSetups],
    queryFn: () => getAdminSetupsFn(),
    enabled,
    staleTime: adminQueryStaleTime,
  })
}

export default useGetAdminSetups
