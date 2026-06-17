import { Outlet, createFileRoute } from '@tanstack/react-router'

import AdminLayout from '#/features/admin/components/admin-layout'
import { guardAdminRoute } from '#/features/auth/lib/guard-admin-route'

export const Route = createFileRoute('/_admin')({
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
