import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import type { Role } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

export type AdminUser = {
  id: string
  name: string
  email: string
  role: Role
  emailVerified: boolean
  createdAt: Date
}

export type AdminUserRoleCounts = {
  admin: number
  user: number
}

export type GetAdminUsersResult = {
  users: AdminUser[]
}

export const getAdminUsersFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .handler(async (): Promise<GetAdminUsersResult> => {
    await requireAdmin()

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    })

    return { users }
  })
