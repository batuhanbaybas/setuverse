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
import type { AdminListSearch } from '../lib/admin-list-search'
import type { AdminPagination } from '../lib/admin-pagination'

type AdminTableSectionProps<T> = {
  title: string
  description: string
  filters?: ReactNode
  data: T[]
  columns: AdminTableColumn<T>[]
  getRowKey: (row: T) => string
  pagination: AdminPagination
  search: AdminListSearch
  emptyTitle?: string
  emptyDescription?: string
}

function AdminTableSection<T>({
  title,
  description,
  filters,
  data,
  columns,
  getRowKey,
  pagination,
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

        <AdminTablePagination pagination={pagination} search={search} />
      </CardContent>
    </CardContainer>
  )
}

export default AdminTableSection
