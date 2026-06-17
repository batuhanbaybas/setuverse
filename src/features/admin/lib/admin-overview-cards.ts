import type { IconName } from '#/shared/components/icons/icon-list'

export type AdminOverviewView = 'users' | 'setups' | 'categories'

export type AdminOverviewCard = {
  id: AdminOverviewView
  label: string
  icon: IconName
  search: { view: AdminOverviewView }
}

export const adminOverviewCards: AdminOverviewCard[] = [
  {
    id: 'users',
    label: 'Total Users',
    icon: 'user',
    search: { view: 'users' },
  },
  {
    id: 'setups',
    label: 'Setups',
    icon: 'layout-grid',
    search: { view: 'setups' },
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: 'star',
    search: { view: 'categories' },
  },
]

export function getAdminOverviewCardCount(
  card: AdminOverviewCard,
  data: {
    totalUsers: number
    totalSetups: number
    totalCategories: number
  },
) {
  if (card.id === 'users') return data.totalUsers
  if (card.id === 'setups') return data.totalSetups
  return data.totalCategories
}
