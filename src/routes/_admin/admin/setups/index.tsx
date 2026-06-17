import { createFileRoute } from '@tanstack/react-router'

import { adminSetupsSearchSchema } from '#/features/admin/lib/admin-list-search'
import AdminSetupsPage from '#/features/admin/screen/admin-setups-page'

export const Route = createFileRoute('/_admin/admin/setups/')({
  validateSearch: adminSetupsSearchSchema,
  component: AdminSetupsPage,
})
