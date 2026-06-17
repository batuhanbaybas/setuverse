import { getRouteApi } from '@tanstack/react-router'

import { AdminSetupsDetail } from '../components/admin-list-details'
import {
  getAdminListPage,
  mapSetupStatusFilter,
} from '../lib/admin-list-search'
import { ADMIN_PAGE_SIZE } from '../lib/admin-pagination'
import useGetAdminSetups from '../service/use-get-admin-setups'

const adminSetupsRouteApi = getRouteApi('/_admin/admin/setups/')

function AdminSetupsPage() {
  const search = adminSetupsRouteApi.useSearch()
  const page = getAdminListPage(search)

  const setupsQuery = useGetAdminSetups({
    page,
    pageSize: ADMIN_PAGE_SIZE,
    status: mapSetupStatusFilter(search.setupStatus),
  })

  if (setupsQuery.isLoading) {
    return null
  }

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
