import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const updateSetupRateInputSchema = z.object({
  setupId: z.string(),
  rate: z.number().min(1).max(5),
})

export type UpdateSetupRateResult = {
  rate: number
  averageRate: number | null
  ratingsCount: number
}

export const updateSetupRate = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .validator(updateSetupRateInputSchema)
  .handler(async ({ data, context }): Promise<UpdateSetupRateResult> => {
    const userId = context.session.user.id

    const setupRate = await prisma.setupRate.upsert({
      where: {
        userId_setupId: {
          userId,
          setupId: data.setupId,
        },
      },
      create: {
        userId,
        setupId: data.setupId,
        rate: data.rate,
      },
      update: {
        rate: data.rate,
      },
      select: {
        rate: true,
      },
    })

    const aggregate = await prisma.setupRate.aggregate({
      where: {
        setupId: data.setupId,
      },
      _avg: {
        rate: true,
      },
      _count: {
        rate: true,
      },
    })

    return {
      rate: setupRate.rate,
      averageRate: aggregate._avg.rate,
      ratingsCount: aggregate._count.rate,
    }
  })

export default updateSetupRate
