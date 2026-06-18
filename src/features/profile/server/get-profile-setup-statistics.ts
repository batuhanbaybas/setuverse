import { authMiddleware } from "#/features/auth/middleware/auth.middleware"
import { prisma } from "#/shared/lib/prisma"
import { createServerFn } from "@tanstack/react-start"

export interface GetProfileSetupStatisticsResult {
  publishedSetupsCount: number
  receivedLikesCount: number
  savedSetupsCount: number
}

export const getProfileSetupStatisticsFn = createServerFn({ method: 'GET' }).middleware([authMiddleware])
  .handler(async ({ context }) => {
    const userId = context.session.user.id
    const [publishedSetupsCount, receivedLikesCount, savedSetupsCount] = await Promise.all([
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
          },
        },
      }),
      prisma.setupSave.count({
        where: {
          setup: {
            userId,
          },
        },
      }),
    ])

    return {
      publishedSetupsCount,
      receivedLikesCount,
      savedSetupsCount,
    }
  })