import { Link } from '@tanstack/react-router'

import Icon from '#/shared/components/icons'
import { CardContainer } from '#/shared/components/ui/card/card-wrapper'
import { cn } from '#/shared/lib/utils'

import { CategoryStatusBadge } from '../lib/category-status-badge'
import { SetupStatusBadge } from '../lib/setup-status-badge'
import { UserRoleBadge } from '../lib/user-role-badge'
import {
  adminOverviewCards,
  getAdminOverviewCardCount,
} from '../lib/admin-overview-cards'
import type { AdminCategoryCounts } from '../server/get-admin-categories.functions'
import type { AdminSetupCounts } from '../server/get-admin-overview.functions'
import type { AdminUserRoleCounts } from '../server/get-admin-users.functions'

type AdminStatCardProps = {
  card: (typeof adminOverviewCards)[number]
  count: number
  setupCounts?: AdminSetupCounts
  roleCounts?: AdminUserRoleCounts
  categoryCounts?: AdminCategoryCounts
}

function AdminStatCard({
  card,
  count,
  setupCounts,
  roleCounts,
  categoryCounts,
}: AdminStatCardProps) {
  return (
    <Link
      to="/admin"
      search={card.search}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <CardContainer
        className={cn(
          'flex-row items-center gap-4 px-5 py-5 transition-all',
          'group-hover:border-foreground/15 group-hover:shadow-md',
        )}
      >
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
          <Icon name={card.icon} className="size-5" />
        </div>

        <div className="min-w-0 space-y-2">
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="text-3xl font-semibold tracking-tight">
            {count.toLocaleString()}
          </p>

          {card.id === 'setups' && setupCounts ? (
            <div className="flex flex-wrap gap-2">
              <SetupStatusBadge status="PENDING" count={setupCounts.pending} />
              <SetupStatusBadge
                status="PUBLISHED"
                count={setupCounts.published}
              />
              <SetupStatusBadge
                status="REJECTED"
                count={setupCounts.rejected}
              />
            </div>
          ) : null}

          {card.id === 'users' && roleCounts ? (
            <div className="flex flex-wrap gap-2">
              <UserRoleBadge role="ADMIN" count={roleCounts.admin} />
              <UserRoleBadge role="USER" count={roleCounts.user} />
            </div>
          ) : null}

          {card.id === 'categories' && categoryCounts ? (
            <div className="flex flex-wrap gap-2">
              <CategoryStatusBadge isActive count={categoryCounts.active} />
              <CategoryStatusBadge
                isActive={false}
                count={categoryCounts.inactive}
              />
            </div>
          ) : null}
        </div>
      </CardContainer>
    </Link>
  )
}

type AdminOverviewProps = {
  totalUsers: number
  totalSetups: number
  totalCategories: number
  setupCounts: AdminSetupCounts
  roleCounts: AdminUserRoleCounts
  categoryCounts: AdminCategoryCounts
}

function AdminOverview({
  totalUsers,
  totalSetups,
  totalCategories,
  setupCounts,
  roleCounts,
  categoryCounts,
}: AdminOverviewProps) {
  const overview = { totalUsers, totalSetups, totalCategories }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {adminOverviewCards.map((card) => (
        <AdminStatCard
          key={card.id}
          card={card}
          count={getAdminOverviewCardCount(card, overview)}
          setupCounts={card.id === 'setups' ? setupCounts : undefined}
          roleCounts={card.id === 'users' ? roleCounts : undefined}
          categoryCounts={card.id === 'categories' ? categoryCounts : undefined}
        />
      ))}
    </div>
  )
}

export default AdminOverview
