import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import { prisma } from '#/shared/lib/prisma'

import type { AdminCategoryCounts } from './get-admin-categories.functions'
import type { AdminUserRoleCounts } from './get-admin-users.functions'

export type AdminSetupCounts = {
  pending: number
  published: number
  rejected: number
}

export type GetAdminOverviewResult = {
  totalUsers: number
  totalSetups: number
  totalCategories: number
  roleCounts: AdminUserRoleCounts
  setupCounts: AdminSetupCounts
  categoryCounts: AdminCategoryCounts
}

export const getAdminOverviewFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .handler(async (): Promise<GetAdminOverviewResult> => {
    await requireAdmin()

    const [
      totalUsers,
      adminUsers,
      regularUsers,
      pendingSetups,
      publishedSetups,
      rejectedSetups,
      totalCategories,
      activeCategories,
      inactiveCategories,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.setup.count({ where: { status: 'PENDING' } }),
      prisma.setup.count({ where: { status: 'PUBLISHED' } }),
      prisma.setup.count({ where: { status: 'REJECTED' } }),
      prisma.category.count(),
      prisma.category.count({ where: { isActive: true } }),
      prisma.category.count({ where: { isActive: false } }),
    ])

    return {
      totalUsers,
      totalSetups: pendingSetups + publishedSetups + rejectedSetups,
      totalCategories,
      roleCounts: {
        admin: adminUsers,
        user: regularUsers,
      },
      setupCounts: {
        pending: pendingSetups,
        published: publishedSetups,
        rejected: rejectedSetups,
      },
      categoryCounts: {
        active: activeCategories,
        inactive: inactiveCategories,
      },
    }
  })
