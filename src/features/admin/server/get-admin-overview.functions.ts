import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import { prisma } from '#/shared/lib/prisma'

export type GetAdminOverviewResult = {
  totalUsers: number
  totalSetups: number
  totalCategories: number
}

export const getAdminOverviewFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .handler(async (): Promise<GetAdminOverviewResult> => {
    await requireAdmin()

    const [totalUsers, totalSetups, totalCategories] = await Promise.all([
      prisma.user.count(),
      prisma.setup.count({
        where: {
          status: {
            not: 'DRAFT',
          },
        },
      }),
      prisma.category.count(),
    ])

    return {
      totalUsers,
      totalSetups,
      totalCategories,
    }
  })
