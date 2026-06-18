import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../server/get-categories.functions'
import { queryKeys } from '#/features/home/lib/query-keys'

const useGetCategories = () => {
  return useQuery({
    queryKey: [queryKeys.getAllCategories],
    queryFn: getCategories,
  })
}

export default useGetCategories
