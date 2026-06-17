import { createMiddleware } from '@tanstack/react-start'

import { isAdminRole } from '#/features/auth/lib/roles'
import { authMiddleware } from '#/features/auth/middleware/auth.middleware'

export const adminMiddleware = createMiddleware({ type: 'function' })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    if (!isAdminRole(context.session.user.role)) {
      throw new Error('Forbidden')
    }

    return next()
  })
