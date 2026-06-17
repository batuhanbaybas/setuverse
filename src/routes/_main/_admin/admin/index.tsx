import AdminPage from '#/features/admin/screen/admin-page'
import { adminListSearchSchema } from '#/features/admin/lib/admin-list-search'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_admin/admin/')({
  validateSearch: adminListSearchSchema,
  component: AdminPage,
})
