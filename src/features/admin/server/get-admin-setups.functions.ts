import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import type { SetupStatus } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

export type AdminSetupStatus = Exclude<SetupStatus, 'DRAFT'>

export type AdminSetup = {
  id: string
  title: string | null
  status: AdminSetupStatus
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
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

export type GetAdminSetupsResult = {
  setups: AdminSetup[]
}

export const getAdminSetupsFn = createServerFn({ method: 'GET' })
  .middleware([adminMiddleware])
  .handler(async (): Promise<GetAdminSetupsResult> => {
    await requireAdmin()

    const setups = await prisma.setup.findMany({
      where: {
        status: {
          not: 'DRAFT',
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
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
    }
  })
