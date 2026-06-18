import { authMiddleware } from "#/features/auth/middleware/auth.middleware"
import { prisma } from "#/shared/lib/prisma"
import { createServerFn } from "@tanstack/react-start"
import z from "zod"

const getProfileSetupInputSchema = z.object({
  userId: z.string().trim().min(1).optional(),
})

export const getProfileSetupFn = createServerFn({ method: 'GET' }).middleware([authMiddleware])
  .validator(getProfileSetupInputSchema)
  .handler(async ({ data, context }) => {
    const userId = data.userId || context.session.user.id

    const setups = await prisma.setup.findMany({
        include:{
            category: true,
        },
      where: {
        userId,
      },
    })

    return setups
  })