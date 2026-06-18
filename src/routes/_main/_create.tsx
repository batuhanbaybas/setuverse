import CreateFlowShell from '#/features/create-setup/components/create-flow-shell'
import { getSession } from '#/features/auth/server/session.functions'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_create')({
  beforeLoad: async ({ location }) => {
    const session = await getSession()

    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CreateFlowShell>
      <Outlet />
    </CreateFlowShell>
  )
}
