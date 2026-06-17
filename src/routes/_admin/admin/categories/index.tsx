import { createFileRoute } from '@tanstack/react-router'

import { adminCategoriesSearchSchema } from '#/features/admin/lib/admin-list-search'
import AdminCategoriesPage from '#/features/admin/screen/admin-categories-page'

export const Route = createFileRoute('/_admin/admin/categories/')({
  validateSearch: adminCategoriesSearchSchema,
  component: AdminCategoriesPage,
})
