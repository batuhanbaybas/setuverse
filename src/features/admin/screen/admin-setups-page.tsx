import { getRouteApi } from '@tanstack/react-router'

import ErrorState from '#/shared/components/error-state'

import { AdminSetupsDetail } from '../components/admin-list-details'
import useGetAdminSetups from '../service/use-get-admin-setups'

const adminSetupsRouteApi = getRouteApi('/_admin/admin/setups/')

function AdminSetupsPage() {
  const search = adminSetupsRouteApi.useSearch()
  const setupsQuery = useGetAdminSetups(search)

  if (setupsQuery.error) {
    return (
      <ErrorState error={setupsQuery.error} message="Failed to load setups" />
    )
  }

  if (!setupsQuery.data) {
    return null
  }

  return (
    <section>
      <AdminSetupsDetail search={search} data={setupsQuery.data} />
    </section>
  )
}

export default AdminSetupsPage
