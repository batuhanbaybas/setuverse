import { authMiddleware } from "#/features/auth/middleware/auth.middleware"
import type { Prisma } from "#/generated/prisma/client"
import { SetupStatus } from "#/generated/prisma/client"
import { prisma } from "#/shared/lib/prisma"
import { createServerFn } from "@tanstack/react-start"

export type ProfileSetup = Prisma.SetupGetPayload<{
  include: { category: true; likes: true }
}>

export const getProfileSetupFn = createServerFn({ method: 'GET' }).middleware([authMiddleware])
  .handler(async ({ context }): Promise<ProfileSetup[]> => {
    const userId = context.session.user.id

    const setups = await prisma.setup.findMany({
        include:{
            category: true,
            likes: true,
        },
      where: {
        userId,
        status: SetupStatus.PUBLISHED,
      },
    })

    return setups
  })