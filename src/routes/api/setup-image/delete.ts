import { createFileRoute } from '@tanstack/react-router'

import { auth } from '#/features/auth/lib/auth'
import { deleteSetupImage } from '#/features/create-setup/server/delete-setup-image'
import { getUploadErrorDetails } from '#/features/create-setup/server/upload-utils'

export const Route = createFileRoute('/api/setup-image/delete')({
  server: {
    handlers: {
      DELETE: async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers })

        if (!session) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = (await request.json().catch(() => null)) as { key?: string } | null
        const key = body?.key?.trim()

        if (!key) {
          return Response.json({ error: 'Image key is required' }, { status: 400 })
        }

        try {
          await deleteSetupImage({
            key,
            userId: session.user.id,
          })

          return Response.json({ success: true })
        } catch (error) {
          const { message, code, status } = getUploadErrorDetails(error)

          console.error('[setup-image/delete]', {
            code,
            message,
            key,
          })

          return Response.json({ error: message, code }, { status })
        }
      },
    },
  },
})
