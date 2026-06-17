import { redirect } from '@tanstack/react-router'

import { ensureAdmin, getSession } from '#/features/auth/lib/auth.functions'

export async function guardAdminRoute(location: { pathname: string }) {
  try {
    const session = await ensureAdmin()
    return { session }
  } catch {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }

    throw redirect({ to: '/' })
  }
}
