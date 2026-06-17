import { createFileRoute } from '@tanstack/react-router'

import AdminOverviewPage from '#/features/admin/screen/admin-overview-page'

export const Route = createFileRoute('/_admin/admin/')({
  component: AdminOverviewPage,
})
