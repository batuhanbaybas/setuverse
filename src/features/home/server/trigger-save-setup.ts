import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const triggerSaveSetupInputSchema = z.object({
  setupId: z.string(),
})

export type TriggerSaveSetupResult = {
  isSaved: boolean
}

export const triggerSaveSetup = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .validator(triggerSaveSetupInputSchema)
  .handler(async ({ data, context }): Promise<TriggerSaveSetupResult> => {
    const userId = context.session.user.id

    const existingSave = await prisma.setupSave.findUnique({
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

    if (existingSave) {
      await prisma.setupSave.delete({
        where: {
          userId_setupId: {
            userId,
            setupId: data.setupId,
          },
        },
      })

      return { isSaved: false }
    }

    await prisma.setupSave.create({
      data: {
        userId,
        setupId: data.setupId,
      },
    })

    return { isSaved: true }
  })

export default triggerSaveSetup
