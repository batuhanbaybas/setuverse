import { createFileRoute } from '@tanstack/react-router'

import { adminSetupsSearchSchema } from '#/features/admin/lib/admin-list-search'
import { prefetchAdminSetups } from '#/features/admin/lib/admin-route-loaders'
import AdminSetupsPage from '#/features/admin/screen/admin-setups-page'

export const Route = createFileRoute('/_admin/admin/setups/')({
  validateSearch: adminSetupsSearchSchema,
  beforeLoad: async ({ context: { queryClient }, search }) => {
    await prefetchAdminSetups(queryClient, search)
  },
  component: AdminSetupsPage,
})
