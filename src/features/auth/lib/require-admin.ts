import { isAdminRole } from '#/features/auth/lib/roles'

import { requireSession } from './require-session'

export async function requireAdmin() {
  const session = await requireSession()

  if (!isAdminRole(session.user.role)) {
    throw new Error('Forbidden')
  }

  return session
}
