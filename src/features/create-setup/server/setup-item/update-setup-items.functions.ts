import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { SETUP_FLOW_STEPS } from '../lib/setup-flow-steps'
import { updateSetupItemsInputSchema } from '../lib/setup-input-schemas'
import type { UpdateSetupItemsInput } from '../lib/setup-input-schemas'
import { requireOwnedDraftSetup } from '../lib/require-owned-draft-setup'

export type { UpdateSetupItemsInput }

export type UpdateSetupItemsResult = {
  id: string
  completedStep: number
  itemCount: number
}

export const updateSetupItemsFn = createServerFn({ method: 'POST' })
  .validator(updateSetupItemsInputSchema)
  .handler(async ({ data }): Promise<UpdateSetupItemsResult> => {
    const session = await requireSession()

    await requireOwnedDraftSetup({
      setupId: data.setupId,
      userId: session.user.id,
      minCompletedStep: SETUP_FLOW_STEPS.INFO,
    })

    return prisma.$transaction(async (tx) => {
      await tx.setupItem.deleteMany({
        where: { setupId: data.setupId },
      })

      await tx.setupItem.createMany({
        data: data.items.map((item) => ({
          setupId: data.setupId,
          name: item.name,
          url: item.url,
          x: item.x,
          y: item.y,
        })),
      })

      const setup = await tx.setup.update({
        where: { id: data.setupId },
        data: {
          completedStep: SETUP_FLOW_STEPS.ITEMS,
        },
        select: {
          id: true,
          completedStep: true,
        },
      })

      return {
        ...setup,
        itemCount: data.items.length,
      }
    })
  })
