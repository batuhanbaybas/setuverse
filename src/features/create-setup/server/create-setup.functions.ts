import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { getR2PublicUrl } from '#/features/setup/lib/r2'
import { getSetupImageKeyFromUrl } from '#/features/setup/lib/setup-image-src'
import { prisma } from '#/shared/lib/prisma'

import { createSetupInputSchema } from './lib/setup-input-schemas'
import type { CreateSetupInput } from './lib/setup-input-schemas'
import { SETUP_FLOW_STEPS } from './lib/setup-flow-steps'
import { isOwnedSetupImageUrl } from './r2/utils'

export type { CreateSetupInput }

export type CreateSetupResult = {
  id: string
  completedStep: number
}

export const createSetupFn = createServerFn({ method: 'POST' })
  .validator(createSetupInputSchema)
  .handler(async ({ data }): Promise<CreateSetupResult> => {
    const session = await requireSession()
    const imageKey = getSetupImageKeyFromUrl(data.imageUrl)

    if (!imageKey || !isOwnedSetupImageUrl(data.imageUrl, session.user.id)) {
      throw new Error('Invalid setup image')
    }

    const imageUrl = getR2PublicUrl(imageKey)

    return prisma.setup.create({
      data: {
        imageUrl,
        userId: session.user.id,
        completedStep: SETUP_FLOW_STEPS.IMAGE,
        status: 'DRAFT',
      },
      select: {
        id: true,
        completedStep: true,
      },
    })
  })
