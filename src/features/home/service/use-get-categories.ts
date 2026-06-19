import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { getCategories } from '../server/get-categories.functions'
import { queryKeys } from '#/features/home/lib/query-keys'
import { useServerFn } from '@tanstack/react-start'
import type { Category } from '#/generated/prisma/client'

const useGetCategories = (): UseQueryResult<Category[]> => {
  const getCategoriesFn = useServerFn(getCategories)
  return useQuery({
    queryKey: [queryKeys.getAllCategories],
    queryFn: getCategoriesFn,
  })
}

export default useGetCategories
