import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { adminQueryStaleTime } from '../lib/admin-query-options'
import type { GetAdminUsersResult } from '../server/get-admin-users.functions'
import { getAdminUsersFn } from '../server/get-admin-users.functions'

const useGetAdminUsers = (enabled = true) => {
  return useQuery<GetAdminUsersResult, Error>({
    queryKey: [queryKeys.getAdminUsers],
    queryFn: () => getAdminUsersFn(),
    enabled,
    staleTime: adminQueryStaleTime,
  })
}

export default useGetAdminUsers
