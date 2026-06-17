import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import { prisma } from '#/shared/lib/prisma'

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

export type GetAdminCategoriesResult = {
  categories: AdminCategory[]
}

export const getAdminCategoriesFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .handler(async (): Promise<GetAdminCategoriesResult> => {
    await requireAdmin()

    const categories = await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
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
    }
  })
