import { createServerFn } from '@tanstack/react-start'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

import {
  createSetupInputSchema,
  type CreateSetupInput,
} from './lib/setup-input-schemas'
import { SETUP_FLOW_STEPS } from './lib/setup-flow-steps'
import { isOwnedSetupImageUrl } from './r2/utils'

export type { CreateSetupInput }

export type CreateSetupResult = {
  id: string
  completedStep: number
}

export const createSetupFn = createServerFn({ method: 'POST' })
  .validator((data: unknown) => createSetupInputSchema.parse(data))
  .handler(async ({ data }): Promise<CreateSetupResult> => {
    const session = await requireSession()
    const publicUrl = process.env.R2_PUBLIC_URL

    if (!publicUrl) {
      throw new Error('Cloudflare R2 environment variables are not configured')
    }

    if (!isOwnedSetupImageUrl(data.imageUrl, session.user.id, publicUrl)) {
      throw new Error('Invalid setup image')
    }

    return prisma.setup.create({
      data: {
        imageUrl: data.imageUrl,
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
