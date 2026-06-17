import { Link } from '@tanstack/react-router'

import { Button } from '#/shared/components/ui/button'

import type { AdminListSearch } from '../lib/admin-list-search'
import type { AdminPagination } from '../lib/admin-pagination'

type AdminTablePaginationProps = {
  pagination: AdminPagination
  search: AdminListSearch
}

function AdminTablePagination({
  pagination,
  search,
}: AdminTablePaginationProps) {
  const { page, totalPages, total, pageSize } = pagination
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const baseSearch = {
    view: search.view,
    setupStatus: search.setupStatus,
    userRole: search.userRole,
    categoryStatus: search.categoryStatus,
  }

  return (
    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {total === 0
          ? 'No results'
          : `Showing ${start.toLocaleString()}-${end.toLocaleString()} of ${total.toLocaleString()}`}
      </p>

      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          disabled={page <= 1}
        >
          <Link
            to="/admin"
            search={{ ...baseSearch, page: page - 1 }}
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
          >
            Previous
          </Link>
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
          <Link
            to="/admin"
            search={{ ...baseSearch, page: page + 1 }}
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? 'pointer-events-none opacity-50' : undefined
            }
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default AdminTablePagination
