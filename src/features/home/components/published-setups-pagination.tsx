import { Link } from '@tanstack/react-router'

import { Button } from '#/shared/components/ui/button'

import type { HomeSearch } from '../lib/home-list-search'
import type { HomePagination } from '../lib/home-pagination'

type PublishedSetupsPaginationProps = {
  pagination: HomePagination
  search: HomeSearch
}

function PublishedSetupsPagination({
  pagination,
  search,
}: PublishedSetupsPaginationProps) {
  const { page, totalPages, total, pageSize } = pagination
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const previousSearch = { ...search, page: page - 1 }
  const nextSearch = { ...search, page: page + 1 }

  return (
    <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {total === 0
          ? 'No results'
          : `Showing ${start.toLocaleString()}-${end.toLocaleString()} of ${total.toLocaleString()}`}
      </p>

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm" disabled={page <= 1}>
          <Link
            to="/"
            search={previousSearch}
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
          >
            Previous
          </Link>
        </Button>

        <span className="px-2 text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button asChild variant="outline" size="sm" disabled={page >= totalPages}>
          <Link
            to="/"
            search={nextSearch}
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

export default PublishedSetupsPagination
