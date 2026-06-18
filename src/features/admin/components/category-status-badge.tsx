import { Badge } from '#/shared/components/ui/badge'
import { cn } from '#/shared/lib/utils'

import { adminBadgeClassName } from '../lib/admin-badge-styles'

type CategoryStatusBadgeProps = {
  isActive: boolean
  count?: number
}

const activeClassName =
  'border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-200'

const inactiveClassName =
  'border-border bg-muted text-muted-foreground'

export function CategoryStatusBadge({ isActive, count }: CategoryStatusBadgeProps) {
  const label = isActive ? 'Active' : 'Inactive'

  return (
    <Badge
      variant="outline"
      className={cn(
        adminBadgeClassName,
        isActive ? activeClassName : inactiveClassName,
      )}
    >
      {label}
      {count !== undefined ? ` ${count.toLocaleString()}` : null}
    </Badge>
  )
}
