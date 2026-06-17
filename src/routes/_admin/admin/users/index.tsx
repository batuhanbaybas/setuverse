import { createFileRoute } from '@tanstack/react-router'

import { adminUsersSearchSchema } from '#/features/admin/lib/admin-list-search'
import { prefetchAdminUsers } from '#/features/admin/lib/admin-route-loaders'
import AdminUsersPage from '#/features/admin/screen/admin-users-page'

export const Route = createFileRoute('/_admin/admin/users/')({
  validateSearch: adminUsersSearchSchema,
  beforeLoad: async ({ context: { queryClient }, search }) => {
    await prefetchAdminUsers(queryClient, search)
  },
  component: AdminUsersPage,
})
