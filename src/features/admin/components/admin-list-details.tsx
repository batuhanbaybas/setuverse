import AdminSetupActions from './admin-setup-actions'
import {
  CategoryTableFilters,
  SetupTableFilters,
  UserTableFilters,
} from './admin-table-filters'
import AdminTableSection from './admin-table-section'
import type { AdminTableColumn } from './admin-data-table'
import {
  getAdminCategoryColumns,
  getAdminSetupColumns,
  getAdminUserColumns,
} from './admin-table-columns'
import type {
  AdminCategoriesSearch,
  AdminSetupsSearch,
  AdminUsersSearch,
} from '../lib/admin-list-search'
import type { GetAdminCategoriesResult } from '../server/get-admin-categories.functions'
import type { GetAdminSetupsResult } from '../server/get-admin-setups.functions'
import type { GetAdminUsersResult } from '../server/get-admin-users.functions'

type AdminUsersDetailProps = {
  search: AdminUsersSearch
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
      paginationTo="/admin/users"
      search={search}
      emptyTitle="No users found"
      emptyDescription="Registered users will appear here."
    />
  )
}

type AdminSetupsDetailProps = {
  search: AdminSetupsSearch
  data: GetAdminSetupsResult
}

export function AdminSetupsDetail({ search, data }: AdminSetupsDetailProps) {
  const setupColumns: AdminTableColumn<(typeof data.setups)[number]>[] = [
    ...getAdminSetupColumns({ showStatus: true }),
    {
      id: 'actions',
      header: 'Actions',
      render: (setup) => <AdminSetupActions setup={setup} />,
    },
  ]

  return (
    <AdminTableSection
      title="Setups"
      description="All submitted setups including pending review."
      filters={<SetupTableFilters search={search} counts={data.counts} />}
      data={data.setups}
      columns={setupColumns}
      getRowKey={(setup) => setup.id}
      pagination={data.pagination}
      paginationTo="/admin/setups"
      search={search}
      emptyTitle="No setups found"
      emptyDescription="Setups will appear here once they leave draft status."
    />
  )
}

type AdminCategoriesDetailProps = {
  search: AdminCategoriesSearch
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
      paginationTo="/admin/categories"
      search={search}
      emptyTitle="No categories found"
      emptyDescription="Categories will appear here once they are created."
    />
  )
}
