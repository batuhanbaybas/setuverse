import { getRouteApi } from '@tanstack/react-router'

import ErrorState from '#/shared/components/error-state'

import { AdminCategoriesDetail } from '../components/admin-list-details'
import useGetAdminCategories from '../service/use-get-admin-categories'

const adminCategoriesRouteApi = getRouteApi('/_admin/admin/categories/')

function AdminCategoriesPage() {
  const search = adminCategoriesRouteApi.useSearch()
  const categoriesQuery = useGetAdminCategories(search)

  if (categoriesQuery.error) {
    return (
      <ErrorState
        error={categoriesQuery.error}
        message="Failed to load categories"
      />
    )
  }

  if (!categoriesQuery.data) {
    return null
  }

  return (
    <section>
      <AdminCategoriesDetail search={search} data={categoriesQuery.data} />
    </section>
  )
}

export default AdminCategoriesPage
