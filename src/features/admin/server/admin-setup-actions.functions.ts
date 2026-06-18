import { createServerFn } from '@tanstack/react-start'

import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import { deleteR2Object } from '#/features/setup/lib/r2'
import { getSetupImageKeyFromUrl } from '#/features/setup/lib/setup-image-src'
import { prisma } from '#/shared/lib/prisma'

import { adminSetupIdInputSchema } from './lib/admin-setup-input-schemas'
import { requireAdminManagedSetup } from './lib/require-admin-setup'

export type AdminSetupActionResult = {
  id: string
  status: 'PUBLISHED' | 'REJECTED'
}

export type AdminDeleteSetupResult = {
  id: string
}

export const adminApproveSetupFn = createServerFn({ method: 'POST' })
  .middleware([adminMiddleware])
  .validator(adminSetupIdInputSchema)
  .handler(async ({ data }): Promise<AdminSetupActionResult> => {
    await requireAdmin()

    const setup = await requireAdminManagedSetup(data.setupId)

    if (setup.status !== 'PENDING') {
      throw new Error('Only pending setups can be published')
    }

    const updated = await prisma.setup.update({
      where: { id: setup.id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
      select: {
        id: true,
        status: true,
      },
    })

    return {
      id: updated.id,
      status: updated.status as 'PUBLISHED',
    }
  })

export const adminRejectSetupFn = createServerFn({ method: 'POST' })
  .middleware([adminMiddleware])
  .validator(adminSetupIdInputSchema)
  .handler(async ({ data }): Promise<AdminSetupActionResult> => {
    await requireAdmin()

    const setup = await requireAdminManagedSetup(data.setupId)

    if (setup.status !== 'PENDING') {
      throw new Error('Only pending setups can be rejected')
    }

    const updated = await prisma.setup.update({
      where: { id: setup.id },
      data: {
        status: 'REJECTED',
        publishedAt: null,
      },
      select: {
        id: true,
        status: true,
      },
    })

    return {
      id: updated.id,
      status: updated.status as 'REJECTED',
    }
  })

export const adminDeleteSetupFn = createServerFn({ method: 'POST' })
  .middleware([adminMiddleware])
  .validator(adminSetupIdInputSchema)
  .handler(async ({ data }): Promise<AdminDeleteSetupResult> => {
    await requireAdmin()

    const setup = await requireAdminManagedSetup(data.setupId)
    const imageKey = setup.imageUrl
      ? getSetupImageKeyFromUrl(setup.imageUrl)
      : null

    await prisma.setup.delete({
      where: { id: setup.id },
    })

    if (imageKey) {
      try {
        await deleteR2Object({ key: imageKey })
      } catch {
        // Setup record is already removed; don't fail the admin action if R2 cleanup fails.
      }
    }

    return { id: setup.id }
  })
