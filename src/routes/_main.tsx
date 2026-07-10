import { createFileRoute, Outlet } from '@tanstack/react-router'

import Navbar from '#/features/shell/components/navbar'
import ScrollToTop from '#/shared/components/scroll-to-top'
import { pageContainerClass } from '#/shared/lib/layout'

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

function MainLayout() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className={pageContainerClass}>
        <Outlet />
      </div>
      <ScrollToTop />
    </main>
  )
}
