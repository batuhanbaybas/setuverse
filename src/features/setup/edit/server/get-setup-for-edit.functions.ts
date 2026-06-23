import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { getSetupForEditInputSchema } from './lib/setup-edit-input-schemas'
import type { GetSetupForEditInput } from './lib/setup-edit-input-schemas'
import { requireOwnedPublishedSetup } from './lib/require-owned-published-setup'

export type { GetSetupForEditInput }

export type SetupForEdit = {
  id: string
  title: string | null
  description: string | null
  imageUrl: string | null
  imageWidth: number | null
  imageHeight: number | null
  categoryId: string | null
  items: {
    id: string
    name: string
    url: string
    x: number
    y: number
  }[]
}

export const getSetupForEditFn = createServerFn({ method: 'GET' })
  .validator(getSetupForEditInputSchema)
  .handler(async ({ data }): Promise<SetupForEdit> => {
    const session = await requireSession()

    const setup = await requireOwnedPublishedSetup({
      setupId: data.setupId,
      userId: session.user.id,
    })

    const items = await prisma.setupItem.findMany({
      where: { setupId: setup.id },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        url: true,
        x: true,
        y: true,
      },
    })

    return {
      ...setup,
      items,
    }
  })
