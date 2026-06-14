import { useFormContext, useWatch } from 'react-hook-form'
import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/shared/components/ui/dialog'
import { Route } from '#/routes/_main/create'
import type { CreateSetupFormValues } from '../lib/create-setup-form'

type SetupPreviewDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function SetupPreviewDialog({ open, onOpenChange }: SetupPreviewDialogProps) {
  const { control } = useFormContext<CreateSetupFormValues>()
  const { categories } = Route.useRouteContext()
  const photo = useWatch({ control, name: 'photo' })
  const title = useWatch({ control, name: 'title' })
  const description = useWatch({ control, name: 'description' })
  const categoryId = useWatch({ control, name: 'categoryId' })

  const category = categories.find((item) => item.id === categoryId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Setup preview</DialogTitle>
          <DialogDescription>
            Preview how your setup will appear to others.
          </DialogDescription>
        </DialogHeader>

        <div className="aspect-video w-full bg-muted">
          {photo?.previewUrl ? (
            <img
              src={photo.previewUrl}
              alt={title || 'Setup cover preview'}
              className="size-full object-cover object-center"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
              No cover photo yet
            </div>
          )}
        </div>

        <div className="space-y-3 p-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">
              {title || 'Untitled setup'}
            </h3>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No description added yet.
              </p>
            )}
          </div>

          {category ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              {category.icon ? (
                <Icon name={category.icon as IconName} className="size-3.5" />
              ) : null}
              {category.name}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SetupPreviewDialog
