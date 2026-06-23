import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { requireOwnedPublishedSetup } from './lib/require-owned-published-setup'
import { updatePublishedSetupInfoInputSchema } from './lib/setup-edit-input-schemas'
import type { UpdatePublishedSetupInfoInput } from './lib/setup-edit-input-schemas'

export type { UpdatePublishedSetupInfoInput }

export type UpdatePublishedSetupInfoResult = {
  id: string
}

export const updatePublishedSetupInfoFn = createServerFn({ method: 'POST' })
  .validator(updatePublishedSetupInfoInputSchema)
  .handler(async ({ data }): Promise<UpdatePublishedSetupInfoResult> => {
    const session = await requireSession()

    await requireOwnedPublishedSetup({
      setupId: data.setupId,
      userId: session.user.id,
    })

    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        isActive: true,
      },
      select: { id: true },
    })

    if (!category) {
      throw new Error('Invalid category')
    }

    return prisma.setup.update({
      where: { id: data.setupId },
      data: {
        title: data.title,
        description: data.description?.trim() ? data.description.trim() : null,
        categoryId: data.categoryId,
      },
      select: {
        id: true,
      },
    })
  })
