import { getRequestHeaders } from '@tanstack/react-start/server'

import { auth } from './auth'

export async function requireSession() {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })

  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}
