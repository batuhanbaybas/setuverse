import { getRouteApi } from '@tanstack/react-router'

import { AdminCategoriesDetail } from '../components/admin-list-details'
import {
  getAdminListPage,
  mapCategoryStatusFilter,
} from '../lib/admin-list-search'
import { ADMIN_PAGE_SIZE } from '../lib/admin-pagination'
import useGetAdminCategories from '../service/use-get-admin-categories'

const adminCategoriesRouteApi = getRouteApi('/_admin/admin/categories/')

function AdminCategoriesPage() {
  const search = adminCategoriesRouteApi.useSearch()
  const page = getAdminListPage(search)

  const categoriesQuery = useGetAdminCategories({
    page,
    pageSize: ADMIN_PAGE_SIZE,
    isActive: mapCategoryStatusFilter(search.categoryStatus),
  })

  if (categoriesQuery.isLoading) {
    return null
  }

  if (categoriesQuery.error) {
    return (
      <section>
        <p className="text-sm text-destructive">
          {categoriesQuery.error.message ?? 'Failed to load categories'}
        </p>
      </section>
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
