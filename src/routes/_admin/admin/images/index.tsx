import { createFileRoute } from '@tanstack/react-router'

import { adminImagesSearchSchema } from '#/features/admin/lib/admin-list-search'
import { prefetchAdminImages } from '#/features/admin/lib/admin-route-loaders'
import AdminImagesPage from '#/features/admin/screen/admin-images-page'

export const Route = createFileRoute('/_admin/admin/images/')({
  validateSearch: adminImagesSearchSchema,
  beforeLoad: async ({ context: { queryClient }, search }) => {
    await prefetchAdminImages(queryClient, search)
  },
  component: AdminImagesPage,
})
