import Navbar from '#/components/navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

function MainLayout() {
  return (
    <main className="min-h-screen container mx-auto">
      <Navbar />
      <Outlet />
    </main>
  )
}
