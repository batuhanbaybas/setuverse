import type { IconName } from '#/shared/components/icons/icon-list'

import type { AdminListSearch } from './admin-list-search'

export type AdminNavItem = {
  label: string
  icon: IconName
  search: AdminListSearch
  isActive: (search: AdminListSearch) => boolean
}

export const adminNavItems: AdminNavItem[] = [
  {
    label: 'Overview',
    icon: 'shield',
    search: {},
    isActive: (search) => !search.view,
  },
  {
    label: 'Users',
    icon: 'user',
    search: { view: 'users' },
    isActive: (search) => search.view === 'users',
  },
  {
    label: 'Setups',
    icon: 'layout-grid',
    search: { view: 'setups' },
    isActive: (search) => search.view === 'setups',
  },
  {
    label: 'Categories',
    icon: 'star',
    search: { view: 'categories' },
    isActive: (search) => search.view === 'categories',
  },
]
