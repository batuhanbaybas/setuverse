import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { updateSetupItemInputSchema } from '../lib/setup-input-schemas'
import type { UpdateSetupItemInput } from '../lib/setup-input-schemas'
import { canModifySetupItems } from '../lib/require-owned-editable-setup'

export type { UpdateSetupItemInput }

export type UpdateSetupItemResult = {
  id: string
  name: string
  url: string
  x: number
  y: number
}

export const updateSetupItemFn = createServerFn({ method: 'POST' })
  .validator(updateSetupItemInputSchema)
  .handler(async ({ data }): Promise<UpdateSetupItemResult> => {
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

    return prisma.setupItem.update({
      where: { id: data.itemId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.url !== undefined && { url: data.url }),
        ...(data.x !== undefined && { x: data.x }),
        ...(data.y !== undefined && { y: data.y }),
      },
      select: {
        id: true,
        name: true,
        url: true,
        x: true,
        y: true,
      },
    })
  })
