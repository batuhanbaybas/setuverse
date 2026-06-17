import { Link } from '@tanstack/react-router'

import { Button } from '#/shared/components/ui/button'

import type {
  AdminCategoriesSearch,
  AdminSetupsSearch,
  AdminUsersSearch,
} from '../lib/admin-list-search'
import type { AdminPagination } from '../lib/admin-pagination'

type AdminUsersPaginationProps = {
  pagination: AdminPagination
  search: AdminUsersSearch
}

type AdminSetupsPaginationProps = {
  pagination: AdminPagination
  search: AdminSetupsSearch
}

type AdminCategoriesPaginationProps = {
  pagination: AdminPagination
  search: AdminCategoriesSearch
}

type AdminTablePaginationProps =
  | ({ to: '/admin/users' } & AdminUsersPaginationProps)
  | ({ to: '/admin/setups' } & AdminSetupsPaginationProps)
  | ({ to: '/admin/categories' } & AdminCategoriesPaginationProps)

function AdminTablePagination(props: AdminTablePaginationProps) {
  const { pagination, to, search } = props
  const { page, totalPages, total, pageSize } = pagination
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const previousSearch = { ...search, page: page - 1 }
  const nextSearch = { ...search, page: page + 1 }

  return (
    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {total === 0
          ? 'No results'
          : `Showing ${start.toLocaleString()}-${end.toLocaleString()} of ${total.toLocaleString()}`}
      </p>

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm" disabled={page <= 1}>
          {to === '/admin/users' ? (
            <Link
              to="/admin/users"
              search={previousSearch}
              aria-disabled={page <= 1}
              className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
            >
              Previous
            </Link>
          ) : to === '/admin/setups' ? (
            <Link
              to="/admin/setups"
              search={previousSearch}
              aria-disabled={page <= 1}
              className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
            >
              Previous
            </Link>
          ) : (
            <Link
              to="/admin/categories"
              search={previousSearch}
              aria-disabled={page <= 1}
              className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
            >
              Previous
            </Link>
          )}
        </Button>

        <span className="px-2 text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button
          asChild
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
        >
          {to === '/admin/users' ? (
            <Link
              to="/admin/users"
              search={nextSearch}
              aria-disabled={page >= totalPages}
              className={
                page >= totalPages ? 'pointer-events-none opacity-50' : undefined
              }
            >
              Next
            </Link>
          ) : to === '/admin/setups' ? (
            <Link
              to="/admin/setups"
              search={nextSearch}
              aria-disabled={page >= totalPages}
              className={
                page >= totalPages ? 'pointer-events-none opacity-50' : undefined
              }
            >
              Next
            </Link>
          ) : (
            <Link
              to="/admin/categories"
              search={nextSearch}
              aria-disabled={page >= totalPages}
              className={
                page >= totalPages ? 'pointer-events-none opacity-50' : undefined
              }
            >
              Next
            </Link>
          )}
        </Button>
      </div>
    </div>
  )
}

export default AdminTablePagination
