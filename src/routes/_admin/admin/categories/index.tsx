import { createFileRoute } from '@tanstack/react-router'

import { adminCategoriesSearchSchema } from '#/features/admin/lib/admin-list-search'
import { prefetchAdminCategories } from '#/features/admin/lib/admin-route-loaders'
import AdminCategoriesPage from '#/features/admin/screen/admin-categories-page'

export const Route = createFileRoute('/_admin/admin/categories/')({
  validateSearch: adminCategoriesSearchSchema,
  beforeLoad: async ({ context: { queryClient }, search }) => {
    await prefetchAdminCategories(queryClient, search)
  },
  component: AdminCategoriesPage,
})
