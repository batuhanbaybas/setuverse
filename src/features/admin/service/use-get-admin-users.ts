import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { adminQueryStaleTime } from '../lib/admin-query-options'
import type { GetAdminUsersInput, GetAdminUsersResult } from '../server/get-admin-users.functions'
import { getAdminUsersFn } from '../server/get-admin-users.functions'

const useGetAdminUsers = (input: GetAdminUsersInput, enabled = true) => {
  return useQuery<GetAdminUsersResult, Error>({
    queryKey: [queryKeys.getAdminUsers, input],
    queryFn: () => getAdminUsersFn({ data: input }),
    enabled,
    staleTime: adminQueryStaleTime,
    placeholderData: (previousData) => previousData,
  })
}

export default useGetAdminUsers
