import { guardAdminRoute } from '#/features/auth/lib/guard-admin-route'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_admin')({
  beforeLoad: async ({ location }) => guardAdminRoute(location),
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
