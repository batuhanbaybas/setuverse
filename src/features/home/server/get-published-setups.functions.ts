import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import type { Prisma } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

import {
  buildHomePagination
  
} from '../lib/home-pagination'
import type {HomePagination} from '../lib/home-pagination';

const getPublishedSetupsInputSchema = z.object({
  take: z.number().int().min(1).max(50).default(10),
  skip: z.number().int().min(0).default(0),
  categoryId: z.string().optional(),
})

export type GetPublishedSetupsInput = z.infer<typeof getPublishedSetupsInputSchema>

export type PublishedSetup = Prisma.SetupGetPayload<{
  include: { category: true, user: true, likes: true }
}>

export type GetPublishedSetupsResult = {
  setups: PublishedSetup[]
  pagination: HomePagination
}

export const getPublishedSetupsFn = createServerFn({ method: 'GET' })
  .validator(getPublishedSetupsInputSchema)
  .handler(async ({ data }): Promise<GetPublishedSetupsResult> => {
    const where = {
      status: 'PUBLISHED' as const,
      categoryId: data.categoryId,
    }

    const page = Math.floor(data.skip / data.take) + 1

    const [total, setups] = await Promise.all([
      prisma.setup.count({ where }),
      prisma.setup.findMany({
        where,
        include: {
          category: true,
          user: true,
          likes: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
        take: data.take,
        skip: data.skip,
      }),
    ])

    return {
      setups,
      pagination: buildHomePagination(total, page, data.take),
    }
  })
