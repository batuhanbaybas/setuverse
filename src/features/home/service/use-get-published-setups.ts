import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import {
  getPublishedSetupsInput,
  publishedSetupsQueryOptions,
} from '../lib/home-queries'
import { getPublishedSetupsFn } from '../server/get-published-setups.functions'
import type { GetPublishedSetupsResult } from '../server/get-published-setups.functions'

type Params = {
  page?: number
  categoryId?: string
}

const useGetPublishedSetups = (
  params: Params,
): UseQueryResult<GetPublishedSetupsResult, Error> => {
  const getPublishedSetups = useServerFn(getPublishedSetupsFn)
  const input = getPublishedSetupsInput(params)

  return useQuery({
    ...publishedSetupsQueryOptions(input),
    queryFn: () => getPublishedSetups({ data: input }),
    placeholderData: (previousData) => previousData,
  })
}

export default useGetPublishedSetups
