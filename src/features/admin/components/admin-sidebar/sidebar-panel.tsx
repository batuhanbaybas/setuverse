import { Link, getRouteApi } from '@tanstack/react-router'

import Icon from '#/shared/components/icons'
import { Badge } from '#/shared/components/ui/badge'
import { cn } from '#/shared/lib/utils'

import { adminNavItems } from '../../lib/admin-nav-items'
import AdminSidebarUser from './sidebar-user'

const adminRouteApi = getRouteApi('/_admin/admin/')

type AdminSidebarPanelProps = {
  onNavigate?: () => void
  className?: string
}

function AdminSidebarPanel({ onNavigate, className }: AdminSidebarPanelProps) {
  const search = adminRouteApi.useSearch()

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="border-b px-4 py-5">
        <Link
          to="/admin"
          search={{}}
          onClick={onNavigate}
          className="flex min-w-0 items-center gap-2"
        >
          <Icon name="palanet" className="size-8 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="truncate text-lg font-bold leading-tight">Setuverse</p>
            <Badge variant="secondary" className="mt-1">
              Admin
            </Badge>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin">
        <p className="px-3 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Menu
        </p>

        {adminNavItems.map((item) => {
          const isActive = item.isActive(search)

          return (
            <Link
              key={item.label}
              to="/admin"
              search={item.search}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              <Icon name={item.icon} className="size-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-3">
        <AdminSidebarUser />
      </div>
    </div>
  )
}

export default AdminSidebarPanel
