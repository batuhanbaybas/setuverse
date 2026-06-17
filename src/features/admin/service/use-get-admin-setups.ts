import { useQuery } from '@tanstack/react-query'

import type { AdminSetupsSearch } from '../lib/admin-list-search'
import {
  adminSetupsQueryOptions,
  getAdminSetupsInput,
} from '../lib/admin-queries'

const useGetAdminSetups = (search: AdminSetupsSearch) => {
  const input = getAdminSetupsInput(search)

  return useQuery({
    ...adminSetupsQueryOptions(input),
    placeholderData: (previousData) => previousData,
  })
}

export default useGetAdminSetups
