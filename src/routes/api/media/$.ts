import { createFileRoute } from '@tanstack/react-router'

import { requireSession } from '#/features/auth/lib/require-session'
import { isOwnedSetupImageKey } from '#/features/create-setup/server/r2/utils'
import { decodeSetupImageKey } from '#/shared/lib/setup-image-src'
import { getR2Object } from '#/shared/lib/r2'

export const Route = createFileRoute('/api/media/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        let session

        try {
          session = await requireSession(request)
        } catch {
          return new Response('Unauthorized', { status: 401 })
        }

        const encodedKey = new URL(request.url).pathname.replace(/^\/api\/media\//, '')

        if (!encodedKey) {
          return new Response('Missing media key', { status: 400 })
        }

        const key = decodeSetupImageKey(encodedKey)

        if (!isOwnedSetupImageKey(key, session.user.id)) {
          return new Response('Forbidden', { status: 403 })
        }

        try {
          const object = await getR2Object({ key })

          return new Response(Buffer.from(object.body), {
            status: 200,
            headers: {
              'Content-Type': object.contentType,
              'Cache-Control': 'private, max-age=86400',
              ...(object.etag ? { ETag: object.etag } : {}),
            },
          })
        } catch {
          return new Response('Not Found', { status: 404 })
        }
      },
    },
  },
})
