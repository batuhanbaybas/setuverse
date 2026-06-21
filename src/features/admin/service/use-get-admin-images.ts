import { useQuery } from '@tanstack/react-query'

import type { AdminImagesSearch } from '../lib/admin-list-search'
import {
  adminImagesQueryOptions,
  getAdminImagesInput,
} from '../lib/admin-queries'

const useGetAdminImages = (search: AdminImagesSearch) => {
  const input = getAdminImagesInput(search)

  return useQuery({
    ...adminImagesQueryOptions(input),
    placeholderData: (previousData) => previousData,
  })
}

export default useGetAdminImages
