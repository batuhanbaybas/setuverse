import { guardAdminRoute } from '#/features/auth/lib/guard-admin-route'
import AdminLayout from '#/features/admin/components/admin-layout'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_admin')({
  beforeLoad: async ({ location }) => guardAdminRoute(location),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
