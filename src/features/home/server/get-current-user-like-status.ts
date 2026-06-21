import { getRequestHeaders } from '@tanstack/react-start/server'

import { auth } from '#/features/auth/lib/auth'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const getCurrentUserLikeStatusInputSchema = z.object({
  setupId: z.string(),
})

export type GetCurrentUserLikeStatusInput = z.infer<
  typeof getCurrentUserLikeStatusInputSchema
>

export type GetCurrentUserLikeStatusResult = {
  isLiked: boolean
  likesCount: number
}

export const getCurrentUserLikeStatusFn = createServerFn({ method: 'GET' })
  .validator(getCurrentUserLikeStatusInputSchema)
  .handler(async ({ data }): Promise<GetCurrentUserLikeStatusResult> => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })
    const userId = session?.user.id

    const likesCount = await prisma.setupLike.count({
      where: {
        setupId: data.setupId,
      },
    })

    if (!userId) {
      return {
        isLiked: false,
        likesCount,
      }
    }

    const setupLike = await prisma.setupLike.findUnique({
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

    return {
      isLiked: setupLike !== null,
      likesCount,
    }
  })

export default getCurrentUserLikeStatusFn
