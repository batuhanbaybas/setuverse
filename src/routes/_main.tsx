import Navbar from '#/features/shell/components/navbar'
import { pageContainerClass } from '#/shared/lib/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

function MainLayout() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className={pageContainerClass}>
        <Outlet />
      </div>
    </main>
  )
}
