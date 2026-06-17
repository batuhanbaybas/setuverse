import type { ReactNode } from 'react'
import { useState } from 'react'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '#/shared/components/ui/sheet'

import AdminSidebar, { AdminSidebarPanel } from './admin-sidebar'

type AdminLayoutProps = {
  children: ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 md:hidden">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setMobileOpen(true)}
            >
              <Icon name="menu" className="size-4" aria-hidden />
              Menu
            </Button>
          </div>

          {children}
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <AdminSidebarPanel onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default AdminLayout
