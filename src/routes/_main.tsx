import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'

import Navbar from '#/features/shell/components/navbar'
import { pageContainerClass } from '#/shared/lib/layout'

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

function MainLayout() {
  const isAdminRoute = useRouterState({
    select: (state) => state.location.pathname.startsWith('/admin'),
  })

  if (isAdminRoute) {
    return <Outlet />
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className={pageContainerClass}>
        <Outlet />
      </div>
    </main>
  )
}
