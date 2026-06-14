import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'
import type { SetupPhoto } from '../../lib/create-setup-form'
import { photoPreviewBoxClassName } from './photo-preview-box'

function HasPhoto({
  photo,
  onEditCrop,
  onPreview,
  openFilePicker,
  handleRemovePhoto,
}: {
  photo: SetupPhoto
  onEditCrop: () => void
  onPreview: () => void
  openFilePicker: () => void
  handleRemovePhoto: () => void
}) {
  return (
    <div
      className={cn(
        'group relative ring-2 ring-primary ring-offset-2 ring-offset-card',
        photoPreviewBoxClassName,
      )}
    >
      <img
        src={photo.previewUrl}
        alt="Setup photo preview"
        className="absolute inset-0 size-full object-cover object-center"
      />

      <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-foreground/50 via-transparent to-transparent p-4 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
        <p className="min-w-0 truncate text-xs text-background/90">
          {photo.file.name}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onEditCrop}
          >
            Edit crop
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={openFilePicker}
          >
            Replace
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemovePhoto}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HasPhoto
