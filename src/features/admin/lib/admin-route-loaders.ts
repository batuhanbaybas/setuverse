import type { QueryClient } from '@tanstack/react-query'

import type {
  AdminCategoriesSearch,
  AdminImagesSearch,
  AdminSetupsSearch,
  AdminUsersSearch,
} from './admin-list-search'
import {
  adminCategoriesQueryOptions,
  adminImagesQueryOptions,
  adminOverviewQueryOptions,
  adminSetupsQueryOptions,
  adminUsersQueryOptions,
  getAdminCategoriesInput,
  getAdminImagesInput,
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

export async function prefetchAdminImages(
  queryClient: QueryClient,
  search: AdminImagesSearch,
) {
  const input = getAdminImagesInput(search)
  await queryClient.ensureQueryData(adminImagesQueryOptions(input))
}
