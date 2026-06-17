import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { adminQueryStaleTime } from '../lib/admin-query-options'
import type { GetAdminOverviewResult } from '../server/get-admin-overview.functions'
import { getAdminOverviewFn } from '../server/get-admin-overview.functions'

const useGetAdminOverview = (enabled = true) => {
  return useQuery<GetAdminOverviewResult, Error>({
    queryKey: [queryKeys.getAdminOverview],
    queryFn: () => getAdminOverviewFn(),
    enabled,
    staleTime: adminQueryStaleTime,
  })
}

export default useGetAdminOverview
