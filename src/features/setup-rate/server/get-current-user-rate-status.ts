import { getRequestHeaders } from '@tanstack/react-start/server'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

import { auth } from '#/features/auth/lib/auth'
import { prisma } from '#/shared/lib/prisma'

const getCurrentUserRateStatusInputSchema = z.object({
  setupId: z.string(),
})

export type GetCurrentUserRateStatusResult = {
  rate: number | null
  averageRate: number | null
  ratingsCount: number
}

export const getCurrentUserRateStatusFn = createServerFn({ method: 'GET' })
  .validator(getCurrentUserRateStatusInputSchema)
  .handler(async ({ data }): Promise<GetCurrentUserRateStatusResult> => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })
    const userId = session?.user.id

    const [aggregate, userRate] = await Promise.all([
      prisma.setupRate.aggregate({
        where: {
          setupId: data.setupId,
        },
        _avg: {
          rate: true,
        },
        _count: {
          rate: true,
        },
      }),
      userId
        ? prisma.setupRate.findUnique({
            where: {
              userId_setupId: {
                userId,
                setupId: data.setupId,
              },
            },
            select: {
              rate: true,
            },
          })
        : Promise.resolve(null),
    ])

    return {
      rate: userRate?.rate ?? null,
      averageRate: aggregate._avg.rate,
      ratingsCount: aggregate._count.rate,
    }
  })

export default getCurrentUserRateStatusFn
