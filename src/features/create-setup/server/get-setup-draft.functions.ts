import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import { getSetupDraftInputSchema } from './lib/setup-input-schemas'
import type { GetSetupDraftInput } from './lib/setup-input-schemas'

export type { GetSetupDraftInput }

export const getSetupDraftFn = createServerFn({ method: 'GET' })
  .validator(getSetupDraftInputSchema)
  .handler(async ({ data }) => {
    const session = await requireSession()

    const setup = await prisma.setup.findFirst({
      where: {
        id: data.setupId,
        userId: session.user.id,
        status: 'DRAFT',
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        completedStep: true,
        status: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        items: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            name: true,
            url: true,
            x: true,
            y: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!setup) {
      throw new Error('Setup not found')
    }

    return setup
  })
