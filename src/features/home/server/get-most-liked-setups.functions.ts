import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import type { Prisma } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

const getMostLikedSetupsInputSchema = z.object({
  take: z.number().int().min(1).max(10).default(3),
})

export type GetMostLikedSetupsInput = z.infer<
  typeof getMostLikedSetupsInputSchema
>

export type MostLikedSetup = Prisma.SetupGetPayload<{
  include: {
    category: true
    user: true
    _count: { select: { likes: true; items: true } }
  }
}>

export type GetMostLikedSetupsResult = {
  setups: MostLikedSetup[]
}

export const getMostLikedSetupsFn = createServerFn({ method: 'GET' })
  .validator(getMostLikedSetupsInputSchema)
  .handler(async ({ data }): Promise<GetMostLikedSetupsResult> => {
    const setups = await prisma.setup.findMany({
      where: {
        status: 'PUBLISHED',
        likes: { some: {} },
      },
      include: {
        category: true,
        user: true,
        _count: {
          select: {
            likes: true,
            items: true,
          },
        },
      },
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      take: data.take,
    })

    return { setups }
  })
