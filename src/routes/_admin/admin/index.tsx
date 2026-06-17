import { createFileRoute } from '@tanstack/react-router'

import { adminListSearchSchema } from '#/features/admin/lib/admin-list-search'
import AdminPage from '#/features/admin/screen/admin-page'

export const Route = createFileRoute('/_admin/admin/')({
  validateSearch: adminListSearchSchema,
  component: AdminPage,
})
