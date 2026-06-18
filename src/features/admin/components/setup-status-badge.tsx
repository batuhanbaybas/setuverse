import { Badge } from '#/shared/components/ui/badge'
import { cn } from '#/shared/lib/utils'

import {
  adminBadgeClassName,
  pendingBadgeClassName,
} from '../lib/admin-badge-styles'
import type { AdminSetupStatus } from '../server/get-admin-setups.functions'

const statusLabels: Record<AdminSetupStatus, string> = {
  PENDING: 'Pending',
  PUBLISHED: 'Published',
  REJECTED: 'Rejected',
}

const statusVariants: Record<
  AdminSetupStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  PENDING: 'outline',
  PUBLISHED: 'default',
  REJECTED: 'destructive',
}

type SetupStatusBadgeProps = {
  status: AdminSetupStatus
}

export function SetupStatusBadge({
  status,
  count,
}: SetupStatusBadgeProps & { count?: number }) {
  const label = statusLabels[status]

  return (
    <Badge
      variant={statusVariants[status]}
      className={cn(
        adminBadgeClassName,
        status === 'PENDING' && pendingBadgeClassName,
      )}
    >
      {label}
      {count !== undefined ? ` ${count.toLocaleString()}` : null}
    </Badge>
  )
}
