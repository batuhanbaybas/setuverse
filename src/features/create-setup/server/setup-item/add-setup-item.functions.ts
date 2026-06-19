import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { SETUP_FLOW_STEPS } from '../lib/setup-flow-steps'
import { addSetupItemInputSchema } from '../lib/setup-input-schemas'
import type { AddSetupItemInput } from '../lib/setup-input-schemas'
import { requireOwnedDraftSetup } from '../lib/require-owned-draft-setup'

export type { AddSetupItemInput }

export type AddSetupItemResult = {
  id: string
  name: string
  url: string
  x: number
  y: number
}

export const addSetupItemFn = createServerFn({ method: 'POST' })
  .validator(addSetupItemInputSchema)
  .handler(async ({ data }): Promise<AddSetupItemResult> => {
    const session = await requireSession()

    await requireOwnedDraftSetup({
      setupId: data.setupId,
      userId: session.user.id,
      minCompletedStep: SETUP_FLOW_STEPS.INFO,
    })

    const [item] = await prisma.$transaction([
      prisma.setupItem.create({
        data: {
          setupId: data.setupId,
          name: data.name,
          url: data.url,
          x: data.x,
          y: data.y,
        },
        select: {
          id: true,
          name: true,
          url: true,
          x: true,
          y: true,
        },
      }),
      prisma.setup.updateMany({
        where: { id: data.setupId, completedStep: { lt: SETUP_FLOW_STEPS.ITEMS } },
        data: { completedStep: SETUP_FLOW_STEPS.ITEMS },
      }),
    ])

    return item
  })
