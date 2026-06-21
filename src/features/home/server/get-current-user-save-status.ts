import { getRequestHeaders } from '@tanstack/react-start/server'

import { auth } from '#/features/auth/lib/auth'
import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const getCurrentUserSaveStatusInputSchema = z.object({
  setupId: z.string(),
})

export type GetCurrentUserSaveStatusInput = z.infer<
  typeof getCurrentUserSaveStatusInputSchema
>

export type GetCurrentUserSaveStatusResult = {
  isSaved: boolean
}

export const getCurrentUserSaveStatusFn = createServerFn({ method: 'GET' })
  .validator(getCurrentUserSaveStatusInputSchema)
  .handler(async ({ data }): Promise<GetCurrentUserSaveStatusResult> => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })
    const userId = session?.user.id

    if (!userId) {
      return {
        isSaved: false,
      }
    }

    const setupSave = await prisma.setupSave.findUnique({
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
      isSaved: setupSave !== null,
    }
  })

export default getCurrentUserSaveStatusFn
