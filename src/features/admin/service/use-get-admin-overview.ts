import { useQuery } from '@tanstack/react-query'

import { adminOverviewQueryOptions } from '../lib/admin-queries'

const useGetAdminOverview = () => {
  return useQuery(adminOverviewQueryOptions())
}

export default useGetAdminOverview
