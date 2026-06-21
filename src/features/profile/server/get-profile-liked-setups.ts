import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import type { Prisma } from '#/generated/prisma/client'
import { SetupStatus } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'

export type LikedSetup = Prisma.SetupGetPayload<{
  include: { category: true; user: true; likes: true }
}>

export const getProfileLikedSetupsFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<LikedSetup[]> => {
    const userId = context.session.user.id

    const setupLikes = await prisma.setupLike.findMany({
      where: {
        userId,
        setup: {
          status: SetupStatus.PUBLISHED,
        },
      },
      include: {
        setup: {
          include: {
            category: true,
            user: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return setupLikes.map((setupLike) => setupLike.setup)
  })
