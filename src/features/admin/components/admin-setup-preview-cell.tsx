import { useState } from 'react'

import SetupImage from '#/shared/components/setup-image'
import { Button } from '#/shared/components/ui/button'

import type { AdminSetup } from '../server/get-admin-setups.functions'
import AdminSetupPreviewDialog from './admin-setup-preview-dialog'

type AdminSetupPreviewCellProps = {
  setup: AdminSetup
}

function AdminSetupPreviewCell({ setup }: AdminSetupPreviewCellProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex w-20 flex-col items-center gap-1.5">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-md border bg-muted">
          {setup.imageUrl ? (
            <SetupImage
              imageUrl={setup.imageUrl}
              alt={setup.title ?? 'Setup image'}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center px-1 text-center text-[10px] leading-tight text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <Button
          variant="link"
          size="xs"
          className="h-auto p-0"
          onClick={() => setOpen(true)}
        >
          View
        </Button>
      </div>

      <AdminSetupPreviewDialog
        setup={setup}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export default AdminSetupPreviewCell
