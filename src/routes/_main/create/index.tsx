import CreateSetupPage from '#/features/create-setup/components/create-setup-page'
import { getSession } from '#/features/auth/lib/auth.functions'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/create/')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    return { user: session.user }
  },
  component: CreateSetup,
})

function CreateSetup() {
  const { user } = Route.useRouteContext()

  return <CreateSetupPage userName={user.name} />
}
