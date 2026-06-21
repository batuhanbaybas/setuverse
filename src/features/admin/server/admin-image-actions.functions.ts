import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { SETUP_IMAGE_KEY_PREFIX } from '#/features/create-setup/server/r2/constants'
import { requireAdmin } from '#/features/auth/lib/require-admin'
import { adminMiddleware } from '#/features/auth/middleware/admin.middleware'
import { deleteR2Object, getR2PublicUrl } from '#/features/setup/lib/r2'
import { prisma } from '#/shared/lib/prisma'

const adminDeleteImageInputSchema = z.object({
  key: z.string().min(1),
})

export type AdminDeleteImageInput = z.infer<typeof adminDeleteImageInputSchema>

export type AdminDeleteImageResult = {
  key: string
}

function assertDeletableSetupImageKey(key: string) {
  if (!key.startsWith(SETUP_IMAGE_KEY_PREFIX)) {
    throw new Error('Invalid image key')
  }
}

export const adminDeleteImageFn = createServerFn({ method: 'POST' })
  .middleware([adminMiddleware])
  .validator(adminDeleteImageInputSchema)
  .handler(async ({ data }): Promise<AdminDeleteImageResult> => {
    await requireAdmin()
    assertDeletableSetupImageKey(data.key)

    const imageUrl = getR2PublicUrl(data.key)
    const setup = await prisma.setup.findFirst({
      where: { imageUrl },
      select: { id: true },
    })

    if (setup) {
      await prisma.setup.update({
        where: { id: setup.id },
        data: { imageUrl: null },
      })
    }

    try {
      await deleteR2Object({ key: data.key })
    } catch {
      // Reference is already cleared; don't fail if R2 cleanup fails.
    }

    return { key: data.key }
  })
