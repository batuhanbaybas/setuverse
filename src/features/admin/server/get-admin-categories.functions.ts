import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import { prisma } from '#/shared/lib/prisma'

import {
  ADMIN_PAGE_SIZE,
  buildAdminPagination,
  getAdminSkip,
  type AdminPagination,
} from '../lib/admin-pagination'

export type AdminCategory = {
  id: string
  name: string
  slug: string
  icon: string | null
  order: number
  isActive: boolean
  createdAt: Date
  setupCount: number
}

export type AdminCategoryCounts = {
  active: number
  inactive: number
}

const getAdminCategoriesInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(ADMIN_PAGE_SIZE),
  isActive: z.boolean().optional(),
})

export type GetAdminCategoriesInput = z.infer<
  typeof getAdminCategoriesInputSchema
>

export type GetAdminCategoriesResult = {
  categories: AdminCategory[]
  pagination: AdminPagination
  counts: AdminCategoryCounts
}

export const getAdminCategoriesFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .validator(getAdminCategoriesInputSchema)
  .handler(async ({ data }): Promise<GetAdminCategoriesResult> => {
    await requireAdmin()

    const where =
      data.isActive === undefined ? undefined : { isActive: data.isActive }

    const [active, inactive, total] = await Promise.all([
      prisma.category.count({ where: { isActive: true } }),
      prisma.category.count({ where: { isActive: false } }),
      prisma.category.count({ where }),
    ])

    const pagination = buildAdminPagination(total, data.page, data.pageSize)

    const categories = await prisma.category.findMany({
      where,
      orderBy: { order: 'asc' },
      skip: getAdminSkip(pagination.page, pagination.pageSize),
      take: pagination.pageSize,
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
          order: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              setups: true,
            },
        },
      },
    })

    return {
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        order: category.order,
        isActive: category.isActive,
        createdAt: category.createdAt,
        setupCount: category._count.setups,
      })),
      pagination,
      counts: {
        active,
        inactive,
      },
    }
  })
