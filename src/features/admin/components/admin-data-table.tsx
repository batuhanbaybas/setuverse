import type { ReactNode } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/shared/components/ui/table'
import { cn } from '#/shared/lib/utils'

export type AdminTableColumn<T> = {
  id: string
  header: string
  cellClassName?: string
  render: (row: T) => ReactNode
}

type AdminDataTableProps<T> = {
  data: T[]
  columns: AdminTableColumn<T>[]
  getRowKey: (row: T) => string
  emptyTitle?: string
  emptyDescription?: string
  bordered?: boolean
}

function AdminDataTable<T>({
  data,
  columns,
  getRowKey,
  emptyTitle = 'No results found',
  emptyDescription = 'Data will appear here once available.',
  bordered = true,
}: AdminDataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed px-6 py-16 text-center">
        <p className="text-sm font-medium">{emptyTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
      </div>
    )
  }

  return (
    <div
      className={
        bordered ? 'overflow-hidden rounded-lg border' : 'overflow-hidden'
      }
    >
      <Table>
        <TableHeader className="bg-muted/70 [&_tr]:border-b [&_tr]:hover:bg-transparent">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className="h-11 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={getRowKey(row)}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={cn(column.cellClassName)}
                >
                  {column.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminDataTable
