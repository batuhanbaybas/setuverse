import { Link } from '@tanstack/react-router'

import Icon from '#/shared/components/icons'
import { CardContainer } from '#/shared/components/ui/card/card-wrapper'
import { cn } from '#/shared/lib/utils'

import {
  adminOverviewCards,
  getAdminOverviewCardCount,
} from '../lib/admin-overview-cards'

type AdminStatCardProps = {
  card: (typeof adminOverviewCards)[number]
  count: number
}

function AdminStatCard({ card, count }: AdminStatCardProps) {
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

        <div className="min-w-0 space-y-1">
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="text-3xl font-semibold tracking-tight">
            {count.toLocaleString()}
          </p>
        </div>
      </CardContainer>
    </Link>
  )
}

type AdminOverviewProps = {
  totalUsers: number
  totalSetups: number
  totalCategories: number
}

function AdminOverview({
  totalUsers,
  totalSetups,
  totalCategories,
}: AdminOverviewProps) {
  const overview = { totalUsers, totalSetups, totalCategories }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {adminOverviewCards.map((card) => (
        <AdminStatCard
          key={card.id}
          card={card}
          count={getAdminOverviewCardCount(card, overview)}
        />
      ))}
    </div>
  )
}

export default AdminOverview
