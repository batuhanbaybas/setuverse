import { Badge } from '#/shared/components/ui/badge'
import { cn } from '#/shared/lib/utils'

import { adminBadgeClassName } from '../lib/admin-badge-styles'
import type { AdminUser } from '../server/get-admin-users.functions'

const roleVariants: Record<
  AdminUser['role'],
  'default' | 'secondary' | 'outline'
> = {
  ADMIN: 'default',
  MODERATOR: 'secondary',
  USER: 'outline',
}

type UserRoleBadgeProps = {
  role: AdminUser['role']
  count?: number
}

export function UserRoleBadge({ role, count }: UserRoleBadgeProps) {
  return (
    <Badge variant={roleVariants[role]} className={cn(adminBadgeClassName)}>
      {role}
      {count !== undefined ? ` ${count.toLocaleString()}` : null}
    </Badge>
  )
}
