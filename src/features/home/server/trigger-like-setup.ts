import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const triggerLikeSetupInputSchema = z.object({
  setupId: z.string(),
  userId: z.string(),
})

export const triggerLikeSetup = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .validator(triggerLikeSetupInputSchema)
  .handler(async ({ data }) => {
    const setup = await prisma.setup.update({
      where: {
        id: data.setupId,
      },
      data: {
        likes: {
          create: {
            userId: data.userId,
          },
        },
      },
    })
    return setup
  })

export default triggerLikeSetup
