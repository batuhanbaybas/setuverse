import { useState } from 'react'

import Icon from '#/shared/components/icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/shared/components/modal/dialog'
import { Button } from '#/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/shared/components/ui/dropdown/dropdown-menu'

import useDeleteUserSetup from '../service/use-delete-user-setup'

type ProfileSetupOwnerActionsProps = {
  setupId: string
  title: string
}

function ProfileSetupOwnerActions({
  setupId,
  title,
}: ProfileSetupOwnerActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const deleteSetup = useDeleteUserSetup()

  const handleDelete = () => {
    deleteSetup.mutate(
      { setupId },
      {
        onSuccess: () => {
          setDeleteOpen(false)
        },
      },
    )
  }

  return (
    <>
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={deleteSetup.isPending}
            aria-label="Open setup actions"
            className="size-8 rounded-full border border-white/80 bg-white/95 text-primary shadow-[0_2px_10px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all hover:border-primary/25 hover:bg-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.16)] active:scale-95"
          >
            <Icon name="ellipsis-vertical" className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
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
                {title.trim() ? title : 'Untitled setup'}
              </span>{' '}
              and its related data.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteSetup.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
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

export default ProfileSetupOwnerActions
