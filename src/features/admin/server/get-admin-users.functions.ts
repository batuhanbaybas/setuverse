import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import type { Role } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

import {
  ADMIN_PAGE_SIZE,
  buildAdminPagination,
  getAdminSkip,
  type AdminPagination,
} from '../lib/admin-pagination'

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

const getAdminUsersInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(ADMIN_PAGE_SIZE),
  role: z.enum(['ADMIN', 'USER']).optional(),
})

export type GetAdminUsersInput = z.infer<typeof getAdminUsersInputSchema>

export type GetAdminUsersResult = {
  users: AdminUser[]
  pagination: AdminPagination
  counts: AdminUserRoleCounts
}

export const getAdminUsersFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .validator(getAdminUsersInputSchema)
  .handler(async ({ data }): Promise<GetAdminUsersResult> => {
    await requireAdmin()

    const where = data.role ? { role: data.role } : undefined

    const [admin, user, total] = await Promise.all([
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.user.count({ where }),
    ])

    const pagination = buildAdminPagination(total, data.page, data.pageSize)

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: getAdminSkip(pagination.page, pagination.pageSize),
      take: pagination.pageSize,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
        createdAt: true,
      },
    })

    return {
      users,
      pagination,
      counts: {
        admin,
        user,
      },
    }
  })
