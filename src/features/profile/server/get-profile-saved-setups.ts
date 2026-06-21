import { authMiddleware } from '#/features/auth/middleware/auth.middleware'
import type { Prisma } from '#/generated/prisma/client'
import { SetupStatus } from '#/generated/prisma/client'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'

export type SavedSetup = Prisma.SetupGetPayload<{
  include: { category: true; user: true; likes: true }
}>

export const getProfileSavedSetupsFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<SavedSetup[]> => {
    const userId = context.session.user.id

    const setupSaves = await prisma.setupSave.findMany({
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

    return setupSaves.map((setupSave) => setupSave.setup)
  })
