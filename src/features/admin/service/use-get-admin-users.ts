import { useQuery } from '@tanstack/react-query'

import type { AdminUsersSearch } from '../lib/admin-list-search'
import {
  adminUsersQueryOptions,
  getAdminUsersInput,
} from '../lib/admin-queries'

const useGetAdminUsers = (search: AdminUsersSearch) => {
  const input = getAdminUsersInput(search)

  return useQuery({
    ...adminUsersQueryOptions(input),
    placeholderData: (previousData) => previousData,
  })
}

export default useGetAdminUsers
