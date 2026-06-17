import { getRouteApi } from '@tanstack/react-router'

import { AdminUsersDetail } from '../components/admin-list-details'
import useGetAdminUsers from '../service/use-get-admin-users'

const adminUsersRouteApi = getRouteApi('/_admin/admin/users/')

function AdminUsersPage() {
  const search = adminUsersRouteApi.useSearch()
  const usersQuery = useGetAdminUsers(search)

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
