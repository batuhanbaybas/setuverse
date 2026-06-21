import { createServerFn } from '@tanstack/react-start'

import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import { deleteR2Object } from '#/features/setup/lib/r2'
import { getSetupImageKeyFromUrl } from '#/features/setup/lib/setup-image-src'
import { prisma } from '#/shared/lib/prisma'

import { requireOwnedSetup } from './lib/require-owned-setup'
import { userSetupIdInputSchema } from './lib/user-setup-input-schemas'

export type DeleteUserSetupResult = {
  id: string
}

export const deleteUserSetupFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(userSetupIdInputSchema)
  .handler(async ({ data, context }): Promise<DeleteUserSetupResult> => {
    const setup = await requireOwnedSetup({
      setupId: data.setupId,
      userId: context.session.user.id,
    })

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
        // Setup record is already removed; don't fail the user action if R2 cleanup fails.
      }
    }

    return { id: setup.id }
  })
