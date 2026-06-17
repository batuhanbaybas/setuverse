import { createFileRoute } from '@tanstack/react-router'

import { adminUsersSearchSchema } from '#/features/admin/lib/admin-list-search'
import AdminUsersPage from '#/features/admin/screen/admin-users-page'

export const Route = createFileRoute('/_admin/admin/users/')({
  validateSearch: adminUsersSearchSchema,
  component: AdminUsersPage,
})
