import ProfilePage from '#/features/profile/screen/profile-page'
import { getSession } from '#/features/auth/lib/auth.functions'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
  },
  component: ProfilePage,
})
