import type { IconName } from '#/shared/components/icons/icon-list'

export type AdminOverviewView = 'users' | 'setups' | 'categories'

export type AdminOverviewCard = {
  id: AdminOverviewView
  label: string
  icon: IconName
  to: '/admin/users' | '/admin/setups' | '/admin/categories'
}

export const adminOverviewCards: AdminOverviewCard[] = [
  {
    id: 'users',
    label: 'Total Users',
    icon: 'user',
    to: '/admin/users',
  },
  {
    id: 'setups',
    label: 'Setups',
    icon: 'layout-grid',
    to: '/admin/setups',
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: 'star',
    to: '/admin/categories',
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
