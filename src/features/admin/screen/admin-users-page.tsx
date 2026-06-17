import { getRouteApi } from '@tanstack/react-router'

import ErrorState from '#/shared/components/error-state'

import { AdminUsersDetail } from '../components/admin-list-details'
import useGetAdminUsers from '../service/use-get-admin-users'

const adminUsersRouteApi = getRouteApi('/_admin/admin/users/')

function AdminUsersPage() {
  const search = adminUsersRouteApi.useSearch()
  const usersQuery = useGetAdminUsers(search)

  if (usersQuery.error) {
    return (
      <ErrorState error={usersQuery.error} message="Failed to load users" />
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
