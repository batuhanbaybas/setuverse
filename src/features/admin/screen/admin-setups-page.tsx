import { getRouteApi } from '@tanstack/react-router'

import { AdminSetupsDetail } from '../components/admin-list-details'
import useGetAdminSetups from '../service/use-get-admin-setups'

const adminSetupsRouteApi = getRouteApi('/_admin/admin/setups/')

function AdminSetupsPage() {
  const search = adminSetupsRouteApi.useSearch()
  const setupsQuery = useGetAdminSetups(search)

  if (setupsQuery.error) {
    return (
      <section>
        <p className="text-sm text-destructive">
          {setupsQuery.error.message ?? 'Failed to load setups'}
        </p>
      </section>
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
