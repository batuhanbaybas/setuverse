import { Badge } from '#/shared/components/ui/badge'
import { cn } from '#/shared/lib/utils'

import { adminBadgeClassName } from '../lib/admin-badge-styles'

type ImageStatusBadgeProps = {
  status: 'referenced' | 'draft'
  count?: number
}

const statusConfig = {
  referenced: {
    label: 'In use',
    className: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
  draft: {
    label: 'Draft',
    className: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
} as const

export function ImageStatusBadge({ status, count }: ImageStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      variant="outline"
      className={cn(adminBadgeClassName, config.className)}
    >
      {config.label}
      {count !== undefined ? ` (${count.toLocaleString()})` : ''}
    </Badge>
  )
}
