import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '#/shared/lib/query-keys'

import { adminQueryStaleTime } from '../lib/admin-query-options'
import type { GetAdminCategoriesInput } from '../server/get-admin-categories.functions'
import type { GetAdminCategoriesResult } from '../server/get-admin-categories.functions'
import { getAdminCategoriesFn } from '../server/get-admin-categories.functions'

const useGetAdminCategories = (
  input: GetAdminCategoriesInput,
  enabled = true,
) => {
  return useQuery<GetAdminCategoriesResult, Error>({
    queryKey: [queryKeys.getAdminCategories, input],
    queryFn: () => getAdminCategoriesFn({ data: input }),
    enabled,
    staleTime: adminQueryStaleTime,
    placeholderData: (previousData) => previousData,
  })
}

export default useGetAdminCategories
