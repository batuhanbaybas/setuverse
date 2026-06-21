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
} from '#/shared/components/modal/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/shared/components/ui/dropdown/dropdown-menu'

import { useAdminDeleteImage } from '../service/use-admin-image-actions'
import type { AdminImage } from '../server/get-admin-images.functions'

type AdminImageActionsProps = {
  image: AdminImage
}

function AdminImageActions({ image }: AdminImageActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const deleteImage = useAdminDeleteImage()

  const handleDelete = () => {
    deleteImage.mutate(
      { key: image.key },
      {
        onSuccess: () => {
          setDeleteOpen(false)
        },
      },
    )
  }

  const imageLabel = image.setup?.title ?? image.key.split('/').pop() ?? 'this image'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={deleteImage.isPending}
            aria-label="Open image actions"
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
            <DialogTitle>Delete image</DialogTitle>
            <DialogDescription>
              This will permanently delete{' '}
              <span className="font-medium text-foreground">{imageLabel}</span>{' '}
              from storage
              {image.setup
                ? ' and remove it from the linked setup.'
                : '.'}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleteImage.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteImage.isPending}
            >
              {deleteImage.isPending ? 'Deleting...' : 'Delete image'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AdminImageActions
