import ProfilePage from '#/features/profile/screen/profile-page'
import { getProfileStatsFn } from '#/features/profile/server/get-profile-stats.functions'
import { queryKeys } from '#/features/profile/lib/query-keys'
import { getSession } from '#/features/auth/server/session.functions'
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
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: [queryKeys.getProfileStats],
      queryFn: () => getProfileStatsFn(),
    })
  },
  component: ProfilePage,
})
