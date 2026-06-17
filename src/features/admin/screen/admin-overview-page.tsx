import { useSession } from '#/features/auth/lib/auth-client'
import ErrorState from '#/shared/components/error-state'

import AdminOverview from '../components/admin-overview'
import useGetAdminOverview from '../service/use-get-admin-overview'

function AdminOverviewPage() {
  const { data: session } = useSession()
  const welcomeName = session?.user.name.split(' ')[0] ?? 'there'
  const overviewQuery = useGetAdminOverview()

  if (overviewQuery.error) {
    return (
      <ErrorState
        error={overviewQuery.error}
        message="Failed to load admin overview"
      />
    )
  }

  if (!overviewQuery.data) {
    return null
  }

  return (
    <section>
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
    </section>
  )
}

export default AdminOverviewPage
