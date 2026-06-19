import { useInfiniteQuery } from '@tanstack/react-query'
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import {
  getPublishedSetupsInput,
  publishedSetupsInfiniteQueryOptions,
} from '../lib/home-queries'
import { getPublishedSetupsFn } from '../server/get-published-setups.functions'
import type { GetPublishedSetupsResult } from '../server/get-published-setups.functions'

type Params = {
  categoryId?: string
}

const useGetPublishedSetups = (
  params: Params,
): UseInfiniteQueryResult<InfiniteData<GetPublishedSetupsResult>, Error> => {
  const getPublishedSetups = useServerFn(getPublishedSetupsFn)
  const { categoryId } = params

  return useInfiniteQuery({
    ...publishedSetupsInfiniteQueryOptions(categoryId),
    queryFn: ({ pageParam }) =>
      getPublishedSetups({
        data: getPublishedSetupsInput({ page: pageParam, categoryId }),
      }),
  })
}

export default useGetPublishedSetups
