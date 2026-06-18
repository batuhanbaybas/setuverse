import { queryOptions } from '@tanstack/react-query'

import { queryKeys } from '#/features/admin/lib/query-keys'

import { adminQueryStaleTime } from './admin-query-options'
import {
  getAdminListPage,
  mapCategoryStatusFilter,
  mapSetupStatusFilter,
  mapUserRoleFilter,
  type AdminCategoriesSearch,
  type AdminSetupsSearch,
  type AdminUsersSearch,
} from './admin-list-search'
import { ADMIN_PAGE_SIZE } from './admin-pagination'
import { getAdminCategoriesFn } from '../server/get-admin-categories.functions'
import type { GetAdminCategoriesInput } from '../server/get-admin-categories.functions'
import { getAdminOverviewFn } from '../server/get-admin-overview.functions'
import { getAdminSetupsFn } from '../server/get-admin-setups.functions'
import type { GetAdminSetupsInput } from '../server/get-admin-setups.functions'
import { getAdminUsersFn } from '../server/get-admin-users.functions'
import type { GetAdminUsersInput } from '../server/get-admin-users.functions'

export function getAdminUsersInput(search: AdminUsersSearch): GetAdminUsersInput {
  return {
    page: getAdminListPage(search),
    pageSize: ADMIN_PAGE_SIZE,
    role: mapUserRoleFilter(search.userRole),
  }
}

export function getAdminSetupsInput(search: AdminSetupsSearch): GetAdminSetupsInput {
  return {
    page: getAdminListPage(search),
    pageSize: ADMIN_PAGE_SIZE,
    status: mapSetupStatusFilter(search.setupStatus),
  }
}

export function getAdminCategoriesInput(
  search: AdminCategoriesSearch,
): GetAdminCategoriesInput {
  return {
    page: getAdminListPage(search),
    pageSize: ADMIN_PAGE_SIZE,
    isActive: mapCategoryStatusFilter(search.categoryStatus),
  }
}

export function adminOverviewQueryOptions() {
  return queryOptions({
    queryKey: [queryKeys.getAdminOverview],
    queryFn: () => getAdminOverviewFn(),
    staleTime: adminQueryStaleTime,
  })
}

export function adminUsersQueryOptions(input: GetAdminUsersInput) {
  return queryOptions({
    queryKey: [queryKeys.getAdminUsers, input],
    queryFn: () => getAdminUsersFn({ data: input }),
    staleTime: adminQueryStaleTime,
  })
}

export function adminSetupsQueryOptions(input: GetAdminSetupsInput) {
  return queryOptions({
    queryKey: [queryKeys.getAdminSetups, input],
    queryFn: () => getAdminSetupsFn({ data: input }),
    staleTime: adminQueryStaleTime,
  })
}

export function adminCategoriesQueryOptions(input: GetAdminCategoriesInput) {
  return queryOptions({
    queryKey: [queryKeys.getAdminCategories, input],
    queryFn: () => getAdminCategoriesFn({ data: input }),
    staleTime: adminQueryStaleTime,
  })
}
