import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import type { SetupStatus } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

import {
  ADMIN_PAGE_SIZE,
  buildAdminPagination,
  getAdminSkip,
  type AdminPagination,
} from '../lib/admin-pagination'

export type AdminSetupStatus = Exclude<SetupStatus, 'DRAFT'>

export type AdminSetupCounts = {
  pending: number
  published: number
  rejected: number
}

export type AdminSetupItem = {
  id: string
  name: string
  url: string
  x: number
  y: number
}

export type AdminSetup = {
  id: string
  title: string | null
  description: string | null
  imageUrl: string | null
  status: AdminSetupStatus
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  items: AdminSetupItem[]
  user: {
    id: string
    name: string
    email: string
  }
  category: {
    id: string
    name: string
  } | null
}

const getAdminSetupsInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(ADMIN_PAGE_SIZE),
  status: z.enum(['PENDING', 'PUBLISHED', 'REJECTED']).optional(),
})

export type GetAdminSetupsInput = z.infer<typeof getAdminSetupsInputSchema>

export type GetAdminSetupsResult = {
  setups: AdminSetup[]
  pagination: AdminPagination
  counts: AdminSetupCounts
}

export const getAdminSetupsFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .validator(getAdminSetupsInputSchema)
  .handler(async ({ data }): Promise<GetAdminSetupsResult> => {
    await requireAdmin()

    const where = data.status
      ? { status: data.status }
      : { status: { not: 'DRAFT' as const } }

    const [pending, published, rejected, total] = await Promise.all([
      prisma.setup.count({ where: { status: 'PENDING' } }),
      prisma.setup.count({ where: { status: 'PUBLISHED' } }),
      prisma.setup.count({ where: { status: 'REJECTED' } }),
      prisma.setup.count({ where }),
    ])

    const pagination = buildAdminPagination(total, data.page, data.pageSize)

    const setups = await prisma.setup.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: getAdminSkip(pagination.page, pagination.pageSize),
      take: pagination.pageSize,
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          publishedAt: true,
          items: {
            orderBy: { createdAt: 'asc' },
            select: {
              id: true,
              name: true,
              url: true,
              x: true,
              y: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
        },
      },
    })

    return {
      setups: setups.map((setup) => ({
        ...setup,
        status: setup.status as AdminSetupStatus,
      })),
      pagination,
      counts: {
        pending,
        published,
        rejected,
      },
    }
  })
