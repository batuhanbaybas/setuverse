import { createServerFn } from '@tanstack/react-start'

import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import { SetupStatus } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'

export type GetProfileStatsResult = {
  setupsCount: number
  likesCount: number
  savedCount: number
}

export const getProfileStatsFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<GetProfileStatsResult> => {
    const userId = context.session.user.id

    const [setupsCount, likesCount, savedCount] = await Promise.all([
      prisma.setup.count({
        where: {
          userId,
          status: SetupStatus.PUBLISHED,
        },
      }),
      prisma.setupLike.count({
        where: {
          userId,
          setup: {
            status: SetupStatus.PUBLISHED,
          },
        },
      }),
      prisma.setupSave.count({
        where: {
          userId,
        },
      }),
    ])

    return {
      setupsCount,
      likesCount,
      savedCount,
    }
  })
