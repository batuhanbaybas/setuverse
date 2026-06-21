import { getRouteApi } from '@tanstack/react-router'

import ErrorState from '#/shared/components/error-state'

import { AdminImagesDetail } from '../components/admin-list-details'
import useGetAdminImages from '../service/use-get-admin-images'

const adminImagesRouteApi = getRouteApi('/_admin/admin/images/')

function AdminImagesPage() {
  const search = adminImagesRouteApi.useSearch()
  const imagesQuery = useGetAdminImages(search)

  if (imagesQuery.error) {
    return (
      <ErrorState error={imagesQuery.error} message="Failed to load images" />
    )
  }

  if (!imagesQuery.data) {
    return null
  }

  return (
    <section>
      <AdminImagesDetail search={search} data={imagesQuery.data} />
    </section>
  )
}

export default AdminImagesPage
