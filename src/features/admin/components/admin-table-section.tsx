import type { ReactNode } from 'react'

import {
  CardContainer,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

import AdminDataTable, {
  type AdminTableColumn,
} from './admin-data-table'
import AdminTablePagination from './admin-table-pagination'
import type {
  AdminCategoriesSearch,
  AdminSetupsSearch,
  AdminUsersSearch,
} from '../lib/admin-list-search'
import type { AdminPagination } from '../lib/admin-pagination'

type AdminUsersTableSectionProps<T> = {
  title: string
  description: string
  filters?: ReactNode
  data: T[]
  columns: AdminTableColumn<T>[]
  getRowKey: (row: T) => string
  pagination: AdminPagination
  paginationTo: '/admin/users'
  search: AdminUsersSearch
  emptyTitle?: string
  emptyDescription?: string
}

type AdminSetupsTableSectionProps<T> = {
  title: string
  description: string
  filters?: ReactNode
  data: T[]
  columns: AdminTableColumn<T>[]
  getRowKey: (row: T) => string
  pagination: AdminPagination
  paginationTo: '/admin/setups'
  search: AdminSetupsSearch
  emptyTitle?: string
  emptyDescription?: string
}

type AdminCategoriesTableSectionProps<T> = {
  title: string
  description: string
  filters?: ReactNode
  data: T[]
  columns: AdminTableColumn<T>[]
  getRowKey: (row: T) => string
  pagination: AdminPagination
  paginationTo: '/admin/categories'
  search: AdminCategoriesSearch
  emptyTitle?: string
  emptyDescription?: string
}

type AdminTableSectionProps<T> =
  | AdminUsersTableSectionProps<T>
  | AdminSetupsTableSectionProps<T>
  | AdminCategoriesTableSectionProps<T>

function AdminTableSection<T>({
  title,
  description,
  filters,
  data,
  columns,
  getRowKey,
  pagination,
  paginationTo,
  search,
  emptyTitle,
  emptyDescription,
}: AdminTableSectionProps<T>) {
  return (
    <CardContainer>
      <CardHeader className="border-b pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {filters}

        <AdminDataTable
          data={data}
          columns={columns}
          getRowKey={getRowKey}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          bordered={false}
        />

        {paginationTo === '/admin/users' ? (
          <AdminTablePagination
            to="/admin/users"
            pagination={pagination}
            search={search as AdminUsersSearch}
          />
        ) : paginationTo === '/admin/setups' ? (
          <AdminTablePagination
            to="/admin/setups"
            pagination={pagination}
            search={search as AdminSetupsSearch}
          />
        ) : (
          <AdminTablePagination
            to="/admin/categories"
            pagination={pagination}
            search={search as AdminCategoriesSearch}
          />
        )}
      </CardContent>
    </CardContainer>
  )
}

export default AdminTableSection
