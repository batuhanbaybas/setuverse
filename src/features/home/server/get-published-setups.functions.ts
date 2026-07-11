import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import type { Prisma } from '#/generated/prisma/client'

import {
  buildHomePagination
} from '../lib/home-pagination'
import type { HomePagination } from '../lib/home-pagination'
import { findPublishedSetupsRealFirst } from '../lib/prioritize-real-setups'

const getPublishedSetupsInputSchema = z.object({
  take: z.number().int().min(1).max(50).default(10),
  skip: z.number().int().min(0).default(0),
  categoryId: z.string().optional(),
})

export type GetPublishedSetupsInput = z.infer<typeof getPublishedSetupsInputSchema>

export type PublishedSetup = Prisma.SetupGetPayload<{
  include: {
    category: true
    user: true
    likes: true
    _count: { select: { items: true } }
  }
}>

export type GetPublishedSetupsResult = {
  setups: PublishedSetup[]
  pagination: HomePagination
}

const publishedSetupInclude = {
  category: true,
  user: true,
  likes: true,
  _count: {
    select: {
      items: true,
    },
  },
} satisfies Prisma.SetupInclude

export const getPublishedSetupsFn = createServerFn({ method: 'GET' })
  .validator(getPublishedSetupsInputSchema)
  .handler(async ({ data }): Promise<GetPublishedSetupsResult> => {
    const page = Math.floor(data.skip / data.take) + 1

    const { setups, total } = await findPublishedSetupsRealFirst({
      take: data.take,
      skip: data.skip,
      categoryId: data.categoryId,
      include: publishedSetupInclude,
    })

    return {
      setups: setups as PublishedSetup[],
      pagination: buildHomePagination(total, page, data.take),
    }
  })
