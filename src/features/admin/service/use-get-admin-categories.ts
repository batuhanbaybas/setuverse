import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { adminQueryStaleTime } from '../lib/admin-query-options'
import type { GetAdminCategoriesResult } from '../server/get-admin-categories.functions'
import { getAdminCategoriesFn } from '../server/get-admin-categories.functions'

const useGetAdminCategories = (enabled = true) => {
  return useQuery<GetAdminCategoriesResult, Error>({
    queryKey: [queryKeys.getAdminCategories],
    queryFn: () => getAdminCategoriesFn(),
    enabled,
    staleTime: adminQueryStaleTime,
  })
}

export default useGetAdminCategories
