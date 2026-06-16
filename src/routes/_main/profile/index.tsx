import ProfilePage from '#/features/profile/screen/profile-page'
import { getSession } from '#/features/auth/lib/auth.functions'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

const validateSearch = z.object({
  tab: z.enum(['my-setups', 'liked', 'saved']).optional(),
})

export const Route = createFileRoute('/_main/profile/')({
  validateSearch,
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
