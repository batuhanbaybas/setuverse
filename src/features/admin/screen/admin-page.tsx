import { Link, getRouteApi } from '@tanstack/react-router'

import { useSession } from '#/features/auth/lib/auth-client'
import Icon from '#/shared/components/icons'

import AdminCategoriesDetail from '../components/admin-categories-detail'
import AdminOverview from '../components/admin-overview'
import AdminSetupsDetail from '../components/admin-setups-detail'
import AdminUsersDetail from '../components/admin-users-detail'
import useGetAdminCategories from '../service/use-get-admin-categories'
import useGetAdminOverview from '../service/use-get-admin-overview'
import useGetAdminSetups from '../service/use-get-admin-setups'
import useGetAdminUsers from '../service/use-get-admin-users'

const adminRouteApi = getRouteApi('/_main/_admin/admin/')

function AdminPage() {
  const { view } = adminRouteApi.useSearch()
  const { data: session } = useSession()
  const isOverview = !view
  const welcomeName = session?.user.name.split(' ')[0] ?? 'there'

  const overviewQuery = useGetAdminOverview(isOverview)
  const setupsQuery = useGetAdminSetups(view === 'setups')
  const usersQuery = useGetAdminUsers(view === 'users')
  const categoriesQuery = useGetAdminCategories(view === 'categories')

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
      <section className="py-8">
        <p className="text-sm text-destructive">
          {activeQuery.error.message ?? 'Failed to load admin data'}
        </p>
      </section>
    )
  }

  return (
    <section className="py-8">
      {view === 'users' ? (
        <>
          <Link
            to="/admin"
            search={{}}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="chevron-right" className="size-4 rotate-180" />
            Back to overview
          </Link>

          <AdminUsersDetail users={usersQuery.data?.users ?? []} />
        </>
      ) : view === 'setups' && setupsQuery.data ? (
        <>
          <Link
            to="/admin"
            search={{}}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="chevron-right" className="size-4 rotate-180" />
            Back to overview
          </Link>

          <AdminSetupsDetail
            title="Setups"
            description="All submitted setups including pending review."
            setups={setupsQuery.data.setups}
            showStatus
          />
        </>
      ) : view === 'categories' && categoriesQuery.data ? (
        <>
          <Link
            to="/admin"
            search={{}}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="chevron-right" className="size-4 rotate-180" />
            Back to overview
          </Link>

          <AdminCategoriesDetail categories={categoriesQuery.data.categories} />
        </>
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
            setupCounts={overviewQuery.data.setupCounts}
            roleCounts={overviewQuery.data.roleCounts}
            categoryCounts={overviewQuery.data.categoryCounts}
          />
        </>
      ) : null}
    </section>
  )
}

export default AdminPage
