import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { requireSession } from '#/features/auth/lib/require-session'
import { deleteSetupImage } from './r2/delete-setup-image'
import { toUploadError } from './r2/errors'

const deleteSetupImageInputSchema = z.object({
  key: z.string().trim().min(1, 'Image key is required'),
})

export const deleteSetupImageFn = createServerFn({ method: 'POST' })
  .validator(deleteSetupImageInputSchema)
  .handler(async ({ data }) => {
    const session = await requireSession()

    try {
      await deleteSetupImage({
        key: data.key,
        userId: session.user.id,
      })

      return { success: true as const }
    } catch (error) {
      throw toUploadError(error)
    }
  })
