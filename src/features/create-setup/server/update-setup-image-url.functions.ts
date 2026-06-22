import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { updateSetupImageUrlInputSchema } from './lib/setup-input-schemas'
import type { UpdateSetupImageUrlInput } from './lib/setup-input-schemas'
import { requireOwnedDraftSetup } from './lib/require-owned-draft-setup'

export type { UpdateSetupImageUrlInput }

export type UpdateSetupImageUrlResult = {
  id: string
  imageUrl: string
  imageWidth: number
  imageHeight: number
}

export const updateSetupImageUrlFn = createServerFn({ method: 'POST' })
  .validator(updateSetupImageUrlInputSchema)
  .handler(async ({ data }): Promise<UpdateSetupImageUrlResult> => {
    const session = await requireSession()

    await requireOwnedDraftSetup({
      setupId: data.setupId,
      userId: session.user.id,
    })

    return prisma.setup.update({
      where: { id: data.setupId },
      data: {
        imageUrl: data.imageUrl,
        imageWidth: data.imageWidth,
        imageHeight: data.imageHeight,
      },
      select: {
        id: true,
        imageUrl: true,
        imageWidth: true,
        imageHeight: true,
      },
    })
  })
