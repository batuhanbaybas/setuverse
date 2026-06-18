import EditProfilePage from '#/features/profile/screen/edit-profile-page'
import { getSession } from '#/features/auth/server/session.functions'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/edit')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
  },
  component: EditProfilePage,
})
