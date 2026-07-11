import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import type { Prisma } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'
import {
  realUserEmailFilter,
  seedUserEmailFilter,
} from '#/shared/lib/seed-data'

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

const mostLikedInclude = {
  category: true,
  user: true,
  _count: {
    select: {
      likes: true,
      items: true,
    },
  },
} satisfies Prisma.SetupInclude

const likedPublishedWhere = {
  status: 'PUBLISHED' as const,
  likes: { some: {} },
}

export const getMostLikedSetupsFn = createServerFn({ method: 'GET' })
  .validator(getMostLikedSetupsInputSchema)
  .handler(async ({ data }): Promise<GetMostLikedSetupsResult> => {
    const orderBy = {
      likes: {
        _count: 'desc' as const,
      },
    }

    const realSetups = await prisma.setup.findMany({
      where: {
        ...likedPublishedWhere,
        user: { email: realUserEmailFilter },
      },
      include: mostLikedInclude,
      orderBy,
      take: data.take,
    })

    if (realSetups.length >= data.take) {
      return { setups: realSetups }
    }

    const seedSetups = await prisma.setup.findMany({
      where: {
        ...likedPublishedWhere,
        user: { email: seedUserEmailFilter },
      },
      include: mostLikedInclude,
      orderBy,
      take: data.take - realSetups.length,
    })

    return { setups: [...realSetups, ...seedSetups] }
  })
