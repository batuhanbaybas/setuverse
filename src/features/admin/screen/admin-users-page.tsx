import { getRouteApi } from '@tanstack/react-router'

import { AdminUsersDetail } from '../components/admin-list-details'
import {
  getAdminListPage,
  mapUserRoleFilter,
} from '../lib/admin-list-search'
import { ADMIN_PAGE_SIZE } from '../lib/admin-pagination'
import useGetAdminUsers from '../service/use-get-admin-users'

const adminUsersRouteApi = getRouteApi('/_admin/admin/users/')

function AdminUsersPage() {
  const search = adminUsersRouteApi.useSearch()
  const page = getAdminListPage(search)

  const usersQuery = useGetAdminUsers({
    page,
    pageSize: ADMIN_PAGE_SIZE,
    role: mapUserRoleFilter(search.userRole),
  })

  if (usersQuery.isLoading) {
    return null
  }

  if (usersQuery.error) {
    return (
      <section>
        <p className="text-sm text-destructive">
          {usersQuery.error.message ?? 'Failed to load users'}
        </p>
      </section>
    )
  }

  if (!usersQuery.data) {
    return null
  }

  return (
    <section>
      <AdminUsersDetail search={search} data={usersQuery.data} />
    </section>
  )
}

export default AdminUsersPage
