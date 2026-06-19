import { infiniteQueryOptions } from '@tanstack/react-query'

import { queryKeys } from '#/features/home/lib/query-keys'

import { getPublishedSetupsFn } from '../server/get-published-setups.functions'
import type { GetPublishedSetupsInput } from '../server/get-published-setups.functions'

export const HOME_SETUPS_PAGE_SIZE = 12

export function getPublishedSetupsInput(params: {
  page?: number
  categoryId?: string
}): GetPublishedSetupsInput {
  const page = params.page ?? 1

  return {
    take: HOME_SETUPS_PAGE_SIZE,
    skip: (page - 1) * HOME_SETUPS_PAGE_SIZE,
    categoryId: params.categoryId,
  }
}

export function publishedSetupsInfiniteQueryOptions(categoryId?: string) {
  return infiniteQueryOptions({
    queryKey: [queryKeys.getPublishedSetups, { categoryId }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getPublishedSetupsFn({
        data: getPublishedSetupsInput({ page: pageParam, categoryId }),
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
  })
}
