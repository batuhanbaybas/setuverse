import { Link } from '@tanstack/react-router'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

import type {
  AdminCategoriesSearch,
  AdminSetupsSearch,
  AdminUsersSearch,
} from '../lib/admin-list-search'
import { CategoryStatusBadge } from './category-status-badge'
import { SetupStatusBadge } from './setup-status-badge'
import { UserRoleBadge } from './user-role-badge'
import type { AdminCategoryCounts } from '../server/get-admin-categories.functions'
import type { AdminSetupCounts } from '../server/get-admin-setups.functions'
import type { AdminUserRoleCounts } from '../server/get-admin-users.functions'

function getFilterBadgeClassName(isActive: boolean) {
  return cn(
    'rounded-full transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    isActive && 'ring-2 ring-foreground/25',
  )
}

type SetupTableFiltersProps = {
  search: AdminSetupsSearch
  counts: AdminSetupCounts
}

export function SetupTableFilters({ search, counts }: SetupTableFiltersProps) {
  const filters = [
    { id: 'pending' as const, status: 'PENDING' as const, count: counts.pending },
    {
      id: 'published' as const,
      status: 'PUBLISHED' as const,
      count: counts.published,
    },
    {
      id: 'rejected' as const,
      status: 'REJECTED' as const,
      count: counts.rejected,
    },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = search.setupStatus === filter.id

        return (
          <Link
            key={filter.id}
            to="/admin/setups"
            search={{
              page: 1,
              setupStatus: isActive ? undefined : filter.id,
            }}
            className={getFilterBadgeClassName(isActive)}
          >
            <SetupStatusBadge status={filter.status} count={filter.count} />
          </Link>
        )
      })}
    </div>
  )
}

type UserTableFiltersProps = {
  search: AdminUsersSearch
  counts: AdminUserRoleCounts
}

export function UserTableFilters({ search, counts }: UserTableFiltersProps) {
  const filters = [
    { id: 'admin' as const, role: 'ADMIN' as const, count: counts.admin },
    { id: 'user' as const, role: 'USER' as const, count: counts.user },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = search.userRole === filter.id

        return (
          <Link
            key={filter.id}
            to="/admin/users"
            search={{
              page: 1,
              userRole: isActive ? undefined : filter.id,
            }}
            className={getFilterBadgeClassName(isActive)}
          >
            <UserRoleBadge role={filter.role} count={filter.count} />
          </Link>
        )
      })}
    </div>
  )
}

type CategoryTableFiltersProps = {
  search: AdminCategoriesSearch
  counts: AdminCategoryCounts
}

export function CategoryTableFilters({
  search,
  counts,
}: CategoryTableFiltersProps) {
  const filters = [
    { id: 'active' as const, isActive: true, count: counts.active },
    { id: 'inactive' as const, isActive: false, count: counts.inactive },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = search.categoryStatus === filter.id

          return (
            <Link
              key={filter.id}
              to="/admin/categories"
              search={{
                page: 1,
                categoryStatus: isActive ? undefined : filter.id,
              }}
              className={getFilterBadgeClassName(isActive)}
            >
              <CategoryStatusBadge
                isActive={filter.isActive}
                count={filter.count}
              />
            </Link>
          )
        })}
      </div>

      <Button type="button" size="sm">
        <Icon name="plus" className="size-4" aria-hidden />
        New Category
      </Button>
    </div>
  )
}
