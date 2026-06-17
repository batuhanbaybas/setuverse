import { createFileRoute } from '@tanstack/react-router'

import { prefetchAdminOverview } from '#/features/admin/lib/admin-route-loaders'
import AdminOverviewPage from '#/features/admin/screen/admin-overview-page'

export const Route = createFileRoute('/_admin/admin/')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await prefetchAdminOverview(queryClient)
  },
  component: AdminOverviewPage,
})
