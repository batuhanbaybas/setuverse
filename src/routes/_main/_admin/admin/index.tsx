import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/_admin/admin/')({
  component: AdminDashboardPage,
})

function AdminDashboardPage() {
  return (
    <section className="py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-2 text-muted-foreground">Admin paneli yakinda burada olacak.</p>
    </section>
  )
}
