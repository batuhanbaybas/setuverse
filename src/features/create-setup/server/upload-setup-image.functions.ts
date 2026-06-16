import { createServerFn } from '@tanstack/react-start'

import { toUploadError } from './r2/errors'
import { parseUploadFile } from './r2/parse-upload-file'
import { uploadSetupImage } from './r2/upload-setup-image'
import { requireSession } from '#/features/auth/lib/require-session'

export const uploadSetupImageFn = createServerFn({ method: 'POST' })
  .validator((data: FormData) => {
    const file = parseUploadFile(data.get('file'))

    if (!file) {
      throw new Error('File is required')
    }

    return { file }
  })
  .handler(async ({ data }) => {
    const session = await requireSession()

    try {
      return await uploadSetupImage({
        file: data.file,
        userId: session.user.id,
      })
    } catch (error) {
      throw toUploadError(error)
    }
  })
