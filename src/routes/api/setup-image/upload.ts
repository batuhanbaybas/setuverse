import { createFileRoute } from '@tanstack/react-router'

import { auth } from '#/features/auth/lib/auth'
import { uploadSetupImage } from '#/features/create-setup/server/upload-setup-image'
import {
  getUploadErrorDetails,
  parseUploadFile,
} from '#/features/create-setup/server/upload-utils'

export const Route = createFileRoute('/api/setup-image/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers })

        if (!session) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = parseUploadFile(formData.get('file'))

        if (!file) {
          return Response.json({ error: 'File is required' }, { status: 400 })
        }

        try {
          const result = await uploadSetupImage({
            file,
            userId: session.user.id,
          })

          return Response.json(result)
        } catch (error) {
          const { message, code, status } = getUploadErrorDetails(error)

          console.error('[setup-image/upload]', {
            code,
            message,
            bucket: process.env.R2_BUCKET_NAME,
          })

          return Response.json({ error: message, code }, { status })
        }
      },
    },
  },
})
