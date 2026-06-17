import type { IconName } from '#/shared/components/icons/icon-list'

export type AdminNavItem = {
  label: string
  icon: IconName
  to: '/admin' | '/admin/users' | '/admin/setups' | '/admin/categories'
  isActive: (pathname: string) => boolean
}

function normalizeAdminPath(pathname: string) {
  return pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname
}

export const adminNavItems: AdminNavItem[] = [
  {
    label: 'Overview',
    icon: 'shield',
    to: '/admin',
    isActive: (pathname) => normalizeAdminPath(pathname) === '/admin',
  },
  {
    label: 'Users',
    icon: 'user',
    to: '/admin/users',
    isActive: (pathname) =>
      normalizeAdminPath(pathname).startsWith('/admin/users'),
  },
  {
    label: 'Setups',
    icon: 'layout-grid',
    to: '/admin/setups',
    isActive: (pathname) =>
      normalizeAdminPath(pathname).startsWith('/admin/setups'),
  },
  {
    label: 'Categories',
    icon: 'star',
    to: '/admin/categories',
    isActive: (pathname) =>
      normalizeAdminPath(pathname).startsWith('/admin/categories'),
  },
]
