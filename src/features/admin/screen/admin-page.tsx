import { getRouteApi } from '@tanstack/react-router'

import { useSession } from '#/features/auth/lib/auth-client'

import {
  AdminCategoriesDetail,
  AdminSetupsDetail,
  AdminUsersDetail,
} from '../components/admin-list-details'
import AdminOverview from '../components/admin-overview'
import {
  getAdminListPage,
  mapCategoryStatusFilter,
  mapSetupStatusFilter,
  mapUserRoleFilter,
} from '../lib/admin-list-search'
import { ADMIN_PAGE_SIZE } from '../lib/admin-pagination'
import useGetAdminCategories from '../service/use-get-admin-categories'
import useGetAdminOverview from '../service/use-get-admin-overview'
import useGetAdminSetups from '../service/use-get-admin-setups'
import useGetAdminUsers from '../service/use-get-admin-users'

const adminRouteApi = getRouteApi('/_main/_admin/admin/')

function AdminPage() {
  const search = adminRouteApi.useSearch()
  const { view } = search
  const { data: session } = useSession()
  const isOverview = !view
  const welcomeName = session?.user.name.split(' ')[0] ?? 'there'
  const page = getAdminListPage(search)

  const listInput = {
    page,
    pageSize: ADMIN_PAGE_SIZE,
  }

  const overviewQuery = useGetAdminOverview(isOverview)
  const setupsQuery = useGetAdminSetups(
    {
      ...listInput,
      status: mapSetupStatusFilter(search.setupStatus),
    },
    view === 'setups',
  )
  const usersQuery = useGetAdminUsers(
    {
      ...listInput,
      role: mapUserRoleFilter(search.userRole),
    },
    view === 'users',
  )
  const categoriesQuery = useGetAdminCategories(
    {
      ...listInput,
      isActive: mapCategoryStatusFilter(search.categoryStatus),
    },
    view === 'categories',
  )

  const activeQuery =
    view === 'users'
      ? usersQuery
      : view === 'setups'
        ? setupsQuery
        : view === 'categories'
          ? categoriesQuery
          : overviewQuery

  if (activeQuery.isLoading) {
    return null
  }

  if (activeQuery.error) {
    return (
      <section>
        <p className="text-sm text-destructive">
          {activeQuery.error.message ?? 'Failed to load admin data'}
        </p>
      </section>
    )
  }

  return (
    <section>
      {view === 'users' && usersQuery.data ? (
        <AdminUsersDetail search={search} data={usersQuery.data} />
      ) : view === 'setups' && setupsQuery.data ? (
        <AdminSetupsDetail search={search} data={setupsQuery.data} />
      ) : view === 'categories' && categoriesQuery.data ? (
        <AdminCategoriesDetail search={search} data={categoriesQuery.data} />
      ) : overviewQuery.data ? (
        <>
          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-violet-300">
                {welcomeName}
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Here&apos;s an overview of users, setups, and categories on the
              platform.
            </p>
          </header>
          <AdminOverview
            totalUsers={overviewQuery.data.totalUsers}
            totalSetups={overviewQuery.data.totalSetups}
            totalCategories={overviewQuery.data.totalCategories}
          />
        </>
      ) : null}
    </section>
  )
}

export default AdminPage
