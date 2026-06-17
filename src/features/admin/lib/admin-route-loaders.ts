import type { QueryClient } from '@tanstack/react-query'

import type {
  AdminCategoriesSearch,
  AdminSetupsSearch,
  AdminUsersSearch,
} from './admin-list-search'
import {
  adminCategoriesQueryOptions,
  adminOverviewQueryOptions,
  adminSetupsQueryOptions,
  adminUsersQueryOptions,
  getAdminCategoriesInput,
  getAdminSetupsInput,
  getAdminUsersInput,
} from './admin-queries'

export async function prefetchAdminOverview(queryClient: QueryClient) {
  await queryClient.ensureQueryData(adminOverviewQueryOptions())
}

export async function prefetchAdminUsers(
  queryClient: QueryClient,
  search: AdminUsersSearch,
) {
  const input = getAdminUsersInput(search)
  await queryClient.ensureQueryData(adminUsersQueryOptions(input))
}

export async function prefetchAdminSetups(
  queryClient: QueryClient,
  search: AdminSetupsSearch,
) {
  const input = getAdminSetupsInput(search)
  await queryClient.ensureQueryData(adminSetupsQueryOptions(input))
}

export async function prefetchAdminCategories(
  queryClient: QueryClient,
  search: AdminCategoriesSearch,
) {
  const input = getAdminCategoriesInput(search)
  await queryClient.ensureQueryData(adminCategoriesQueryOptions(input))
}
