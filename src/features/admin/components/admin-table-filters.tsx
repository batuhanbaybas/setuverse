import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { cn } from '#/shared/lib/utils'

import type { AdminListSearch } from '../lib/admin-list-search'
import { CategoryStatusBadge } from '../lib/category-status-badge'
import { SetupStatusBadge } from '../lib/setup-status-badge'
import { UserRoleBadge } from '../lib/user-role-badge'
import type { AdminCategoryCounts } from '../server/get-admin-categories.functions'
import type { AdminSetupCounts } from '../server/get-admin-setups.functions'
import type { AdminUserRoleCounts } from '../server/get-admin-users.functions'

type FilterBadgeLinkProps = {
  isActive: boolean
  search: AdminListSearch
  children: ReactNode
}

function FilterBadgeLink({ isActive, search, children }: FilterBadgeLinkProps) {
  return (
    <Link
      to="/admin"
      search={search}
      className={cn(
        'rounded-full transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive && 'ring-2 ring-foreground/25',
      )}
    >
      {children}
    </Link>
  )
}

type SetupTableFiltersProps = {
  search: AdminListSearch
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
          <FilterBadgeLink
            key={filter.id}
            isActive={isActive}
            search={{
              view: 'setups',
              page: 1,
              setupStatus: isActive ? undefined : filter.id,
            }}
          >
            <SetupStatusBadge status={filter.status} count={filter.count} />
          </FilterBadgeLink>
        )
      })}
    </div>
  )
}

type UserTableFiltersProps = {
  search: AdminListSearch
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
          <FilterBadgeLink
            key={filter.id}
            isActive={isActive}
            search={{
              view: 'users',
              page: 1,
              userRole: isActive ? undefined : filter.id,
            }}
          >
            <UserRoleBadge role={filter.role} count={filter.count} />
          </FilterBadgeLink>
        )
      })}
    </div>
  )
}

type CategoryTableFiltersProps = {
  search: AdminListSearch
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
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = search.categoryStatus === filter.id

        return (
          <FilterBadgeLink
            key={filter.id}
            isActive={isActive}
            search={{
              view: 'categories',
              page: 1,
              categoryStatus: isActive ? undefined : filter.id,
            }}
          >
            <CategoryStatusBadge
              isActive={filter.isActive}
              count={filter.count}
            />
          </FilterBadgeLink>
        )
      })}
    </div>
  )
}
