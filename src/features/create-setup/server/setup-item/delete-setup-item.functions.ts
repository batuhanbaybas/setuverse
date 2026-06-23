import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { deleteSetupItemInputSchema } from '../lib/setup-input-schemas'
import type { DeleteSetupItemInput } from '../lib/setup-input-schemas'
import { canModifySetupItems } from '../lib/require-owned-editable-setup'

export type { DeleteSetupItemInput }

export const deleteSetupItemFn = createServerFn({ method: 'POST' })
  .validator(deleteSetupItemInputSchema)
  .handler(async ({ data }) => {
    const session = await requireSession()

    const item = await prisma.setupItem.findUnique({
      where: { id: data.itemId },
      select: {
        setup: {
          select: { userId: true, status: true },
        },
      },
    })

    if (!item || item.setup.userId !== session.user.id) {
      throw new Error('Item not found')
    }

    if (!canModifySetupItems(item.setup)) {
      throw new Error('Cannot modify items on this setup')
    }

    await prisma.setupItem.delete({
      where: { id: data.itemId },
    })

    return { success: true as const }
  })
