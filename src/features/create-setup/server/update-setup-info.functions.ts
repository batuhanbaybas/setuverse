import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { SETUP_FLOW_STEPS } from './lib/setup-flow-steps'
import {
  updateSetupInfoInputSchema,
  type UpdateSetupInfoInput,
} from './lib/setup-input-schemas'
import { requireOwnedDraftSetup } from './lib/require-owned-draft-setup'

export type { UpdateSetupInfoInput }

export type UpdateSetupInfoResult = {
  id: string
  completedStep: number
}

export const updateSetupInfoFn = createServerFn({ method: 'POST' })
  .validator((data: unknown) => updateSetupInfoInputSchema.parse(data))
  .handler(async ({ data }): Promise<UpdateSetupInfoResult> => {
    const session = await requireSession()

    await requireOwnedDraftSetup({
      setupId: data.setupId,
      userId: session.user.id,
      minCompletedStep: SETUP_FLOW_STEPS.IMAGE,
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
        name: data.name,
        description: data.description?.trim() ? data.description.trim() : null,
        categoryId: data.categoryId,
        completedStep: SETUP_FLOW_STEPS.INFO,
      },
      select: {
        id: true,
        completedStep: true,
      },
    })
  })
