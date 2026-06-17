import AdminSidebarPanel from './sidebar-panel'

function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-muted/20 md:block">
      <div className="sticky top-0 h-screen">
        <AdminSidebarPanel />
      </div>
    </aside>
  )
}

export { AdminSidebarPanel }
export default AdminSidebar
