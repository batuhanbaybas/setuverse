import { useQuery } from '@tanstack/react-query'

import type { AdminCategoriesSearch } from '../lib/admin-list-search'
import {
  adminCategoriesQueryOptions,
  getAdminCategoriesInput,
} from '../lib/admin-queries'

const useGetAdminCategories = (search: AdminCategoriesSearch) => {
  const input = getAdminCategoriesInput(search)

  return useQuery({
    ...adminCategoriesQueryOptions(input),
    placeholderData: (previousData) => previousData,
  })
}

export default useGetAdminCategories
