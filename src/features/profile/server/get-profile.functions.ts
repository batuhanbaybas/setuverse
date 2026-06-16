import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { requireSession } from '#/features/auth/lib/require-session'
import { prisma } from '#/shared/lib/prisma'

const getProfileInputSchema = z.object({
  userId: z.string().trim().min(1).optional(),
})

export type ProfileSetup = {
  id: string
  title: string | null
  imageUrl: string | null
  description: string | null
  publishedAt: Date | null
  category: {
    id: string
    name: string
    slug: string
  } | null
}

export type GetProfileResult = {
  bio: string | null
  links: Array<{
    id: string
    label: string
    url: string
  }>
  user: {
    id: string
    name: string
    image: string | null
    role: 'USER' | 'MODERATOR' | 'ADMIN'
    createdAt: Date
  }
  publishedSetupsCount: number
  receivedLikesCount: number
  savedSetupsCount: number
  setups: ProfileSetup[]
}

export const getProfileFn = createServerFn({ method: 'GET' })
  .validator(getProfileInputSchema)
  .handler(async ({ data }): Promise<GetProfileResult> => {
    const session = await requireSession()
    const userId = data.userId ?? session.user.id

    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: {
        bio: true,
        links: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            label: true,
            url: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
            createdAt: true,
          },
        },
      },
    })

    if (!profile) {
      throw new Error('Profile not found')
    }

    const [publishedSetupsCount, receivedLikesCount, savedSetupsCount, setups] =
      await Promise.all([
        prisma.setup.count({
          where: {
            userId,
            status: 'PUBLISHED',
          },
        }),
        prisma.setupLike.count({
          where: {
            setup: {
              userId,
              status: 'PUBLISHED',
            },
          },
        }),
        prisma.setupSave.count({
          where: { userId },
        }),
        prisma.setup.findMany({
          where: {
            userId,
            status: 'PUBLISHED',
          },
          orderBy: { publishedAt: 'desc' },
          select: {
            id: true,
            title: true,
            imageUrl: true,
            description: true,
            publishedAt: true,
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        }),
      ])

    return {
      bio: profile.bio,
      links: profile.links,
      user: profile.user,
      publishedSetupsCount,
      receivedLikesCount,
      savedSetupsCount,
      setups,
    }
  })
