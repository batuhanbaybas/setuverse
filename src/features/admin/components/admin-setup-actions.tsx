import { useState } from 'react'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/shared/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/shared/components/ui/dropdown/dropdown-menu'

import {
  useAdminApproveSetup,
  useAdminDeleteSetup,
  useAdminRejectSetup,
} from '../service/use-admin-setup-actions'
import type { AdminSetup } from '../server/get-admin-setups.functions'

type AdminSetupActionsProps = {
  setup: AdminSetup
}

function AdminSetupActions({ setup }: AdminSetupActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const approveSetup = useAdminApproveSetup()
  const rejectSetup = useAdminRejectSetup()
  const deleteSetup = useAdminDeleteSetup()

  const isPending =
    approveSetup.isPending || rejectSetup.isPending || deleteSetup.isPending

  const handleApprove = () => {
    approveSetup.mutate({ setupId: setup.id })
  }

  const handleReject = () => {
    rejectSetup.mutate({ setupId: setup.id })
  }

  const handleDelete = () => {
    deleteSetup.mutate(
      { setupId: setup.id },
      {
        onSuccess: () => {
          setDeleteOpen(false)
        },
      },
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={isPending}
            aria-label="Open setup actions"
          >
            <Icon name="ellipsis-vertical" className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {setup.status === 'PENDING' ? (
            <>
              <DropdownMenuItem onSelect={handleApprove}>
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleReject}>
                Reject
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ) : null}

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete setup</DialogTitle>
            <DialogDescription>
              This will permanently delete{' '}
              <span className="font-medium text-foreground">
                {setup.title ?? 'Untitled setup'}
              </span>{' '}
              and its related data from the database.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteSetup.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteSetup.isPending}
            >
              {deleteSetup.isPending ? 'Deleting...' : 'Delete setup'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AdminSetupActions
