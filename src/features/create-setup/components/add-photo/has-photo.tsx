import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import type { SetupPhoto } from '../../lib/create-setup-form'

function HasPhoto({
  photo,
  openFilePicker,
  handleRemovePhoto,
}: {
  photo: SetupPhoto
  openFilePicker: () => void
  handleRemovePhoto: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-card">
        <div className="aspect-video w-full bg-muted">
          <img
            src={photo.previewUrl}
            alt="Setup photo preview"
            className="size-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-foreground/50 via-transparent to-transparent p-4 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <div className="flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
            <Icon name="star" className="size-3 text-chart-4" />
            Cover photo
          </div>

          <div className="flex items-center gap-2">
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
              variant="destructive"
              size="sm"
              onClick={handleRemovePhoto}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{photo.file.name}</p>
    </div>
  )
}

export default HasPhoto
