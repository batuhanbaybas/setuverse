import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const setupDetailSchema = z.object({
  id: z.string(),
})

export type SetupDetailItem = {
  id: string
  name: string
  url: string
  x: number
  y: number
}

export type SetupDetail = {
  id: string
  title: string | null
  description: string | null
  imageUrl: string | null
  publishedAt: Date | null
  items: SetupDetailItem[]
  user: {
    id: string
    name: string
    image: string | null
  }
  category: {
    id: string
    name: string
    icon: string | null
  } | null
}

const getSetupDetail = createServerFn({
  method: 'GET',
})
  .validator(setupDetailSchema)
  .handler(async ({ data }): Promise<SetupDetail | null> => {
    const { id } = data

    const setup = await prisma.setup.findFirst({
      where: {
        id,
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        publishedAt: true,
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
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    })

    return setup
  })

export default getSetupDetail
