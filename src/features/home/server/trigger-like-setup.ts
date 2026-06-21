import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const triggerLikeSetupInputSchema = z.object({
  setupId: z.string(),
})

export type TriggerLikeSetupResult = {
  isLiked: boolean
}

export const triggerLikeSetup = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .validator(triggerLikeSetupInputSchema)
  .handler(async ({ data, context }): Promise<TriggerLikeSetupResult> => {
    const userId = context.session.user.id

    const existingLike = await prisma.setupLike.findUnique({
      where: {
        userId_setupId: {
          userId,
          setupId: data.setupId,
        },
      },
      select: {
        setupId: true,
      },
    })

    if (existingLike) {
      await prisma.setupLike.delete({
        where: {
          userId_setupId: {
            userId,
            setupId: data.setupId,
          },
        },
      })

      return { isLiked: false }
    }

    await prisma.setupLike.create({
      data: {
        userId,
        setupId: data.setupId,
      },
    })

    return { isLiked: true }
  })

export default triggerLikeSetup
