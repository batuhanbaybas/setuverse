import { createServerFn } from '@tanstack/react-start'

import { prisma } from '#/shared/lib/prisma'
import { authMiddleware } from '#/features/auth/middleware/auth.middleware'

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
}

export const getProfileFn = createServerFn({ method: 'GET' }).middleware([authMiddleware])
  .handler(async ({ context }): Promise<GetProfileResult> => {
    const userId =  context.session.user.id

    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: {
        bio: true,
        links: true,
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

    return {
      bio: profile.bio,
      links: profile.links,
      user: profile.user,
    }
  })
