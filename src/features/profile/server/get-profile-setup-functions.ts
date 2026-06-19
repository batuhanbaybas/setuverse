import { authMiddleware } from "#/features/auth/middleware/auth.middleware"
import { SetupStatus } from "#/generated/prisma/client"
import { prisma } from "#/shared/lib/prisma"
import { createServerFn } from "@tanstack/react-start"


export const getProfileSetupFn = createServerFn({ method: 'GET' }).middleware([authMiddleware])
  .handler(async ({ context }) => {
    const userId = context.session.user.id

    const setups = await prisma.setup.findMany({
        include:{
            category: true,
        },
      where: {
        userId,
        status: SetupStatus.PUBLISHED,
      },
    })

    return setups
  })