import {
  CategoryTableFilters,
  SetupTableFilters,
  UserTableFilters,
} from './admin-table-filters'
import AdminTableSection from './admin-table-section'
import {
  getAdminCategoryColumns,
  getAdminSetupColumns,
  getAdminUserColumns,
} from '../lib/admin-table-columns'
import type { AdminListSearch } from '../lib/admin-list-search'
import type { GetAdminCategoriesResult } from '../server/get-admin-categories.functions'
import type { GetAdminSetupsResult } from '../server/get-admin-setups.functions'
import type { GetAdminUsersResult } from '../server/get-admin-users.functions'

type AdminUsersDetailProps = {
  search: AdminListSearch
  data: GetAdminUsersResult
}

export function AdminUsersDetail({ search, data }: AdminUsersDetailProps) {
  return (
    <AdminTableSection
      title="Total Users"
      description="Registered users on the platform."
      filters={<UserTableFilters search={search} counts={data.counts} />}
      data={data.users}
      columns={getAdminUserColumns()}
      getRowKey={(user) => user.id}
      pagination={data.pagination}
      search={search}
      emptyTitle="No users found"
      emptyDescription="Registered users will appear here."
    />
  )
}

type AdminSetupsDetailProps = {
  search: AdminListSearch
  data: GetAdminSetupsResult
}

export function AdminSetupsDetail({ search, data }: AdminSetupsDetailProps) {
  return (
    <AdminTableSection
      title="Setups"
      description="All submitted setups including pending review."
      filters={<SetupTableFilters search={search} counts={data.counts} />}
      data={data.setups}
      columns={getAdminSetupColumns({ showStatus: true })}
      getRowKey={(setup) => setup.id}
      pagination={data.pagination}
      search={search}
      emptyTitle="No setups found"
      emptyDescription="Setups will appear here once they leave draft status."
    />
  )
}

type AdminCategoriesDetailProps = {
  search: AdminListSearch
  data: GetAdminCategoriesResult
}

export function AdminCategoriesDetail({
  search,
  data,
}: AdminCategoriesDetailProps) {
  return (
    <AdminTableSection
      title="Categories"
      description="Manage platform setup categories."
      filters={<CategoryTableFilters search={search} counts={data.counts} />}
      data={data.categories}
      columns={getAdminCategoryColumns()}
      getRowKey={(category) => category.id}
      pagination={data.pagination}
      search={search}
      emptyTitle="No categories found"
      emptyDescription="Categories will appear here once they are created."
    />
  )
}
