import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '#/lib/auth.functions'

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

  return (
    <section>
      <h1 className="text-4xl font-bold">Create Setup</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Welcome back, {user.name}. Start building your card set.
      </p>
    </section>
  )
}
