import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/shared/components/ui/dialog'
import { cn } from '#/shared/lib/utils'

import AdminSetupPreviewCanvas from './admin-setup-preview-canvas'
import { SetupStatusBadge } from './setup-status-badge'
import type { AdminSetup } from '../server/get-admin-setups.functions'

type AdminSetupPreviewDialogProps = {
  setup: AdminSetup
  open: boolean
  onOpenChange: (open: boolean) => void
}

function AdminSetupPreviewDialog({
  setup,
  open,
  onOpenChange,
}: AdminSetupPreviewDialogProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{setup.title ?? 'Untitled setup'}</DialogTitle>
          <DialogDescription>
            Review setup image and tagged items before taking action.
          </DialogDescription>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <SetupStatusBadge status={setup.status} />
            {setup.category ? (
              <span className="text-sm text-muted-foreground">
                {setup.category.name}
              </span>
            ) : null}
            <span className="text-sm text-muted-foreground">
              · {setup.user.name}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {setup.description ? (
            <p className="text-sm text-muted-foreground">{setup.description}</p>
          ) : null}

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
            <div className="min-w-0">
              {setup.imageUrl ? (
                <AdminSetupPreviewCanvas
                  imageUrl={setup.imageUrl}
                  items={setup.items}
                  activeItemId={activeItemId}
                  onMarkerClick={setActiveItemId}
                />
              ) : (
                <div className="rounded-xl border border-dashed px-6 py-12 text-center text-sm text-muted-foreground">
                  No setup image
                </div>
              )}
            </div>

            <div className="flex min-h-0 min-w-0 flex-col gap-2 md:max-h-[min(70vh,560px)]">
              <h3 className="shrink-0 text-sm font-medium">
                Setup items ({setup.items.length})
              </h3>

              {setup.items.length === 0 ? (
                <div className="rounded-xl border border-dashed px-6 py-8 text-center text-sm text-muted-foreground">
                  No items added to this setup.
                </div>
              ) : (
                <ul className="min-h-0 space-y-2 overflow-y-auto pr-1">
                  {setup.items.map((item, index) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={cn(
                          'w-full rounded-lg border p-3 text-left transition-colors',
                          activeItemId === item.id &&
                            'border-primary bg-primary/5',
                        )}
                        onClick={() => setActiveItemId(item.id)}
                      >
                        <p className="text-sm font-medium">
                          {index + 1}. {item.name}
                        </p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block truncate text-xs text-primary hover:underline"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {item.url}
                        </a>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AdminSetupPreviewDialog
