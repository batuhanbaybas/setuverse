import { queryOptions } from '@tanstack/react-query'

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

export function publishedSetupsQueryOptions(input: GetPublishedSetupsInput) {
  return queryOptions({
    queryKey: [queryKeys.getPublishedSetups, input],
    queryFn: () => getPublishedSetupsFn({ data: input }),
  })
}
