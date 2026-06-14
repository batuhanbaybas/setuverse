import Icon from '#/shared/components/icons'
import { cn } from '#/shared/lib/utils'
import type { SetupPhoto } from '../../lib/create-setup-form'
import { setupPhotoFrameClassName } from '../shared/setup-photo-frame'

type PhotoGalleryItemProps = {
  photo: SetupPhoto
  isCover: boolean
  isSelected: boolean
  isDragging: boolean
  onSelect: (photoId: string) => void
  onRemove: (photoId: string) => void
  onDragStart: (photoId: string) => void
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop: (photoId: string) => void
  onDragEnd: () => void
}

function PhotoGalleryItem({
  photo,
  isCover,
  isSelected,
  isDragging,
  onSelect,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: PhotoGalleryItemProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(photo.id)}
      onDragOver={onDragOver}
      onDrop={(event) => {
        event.preventDefault()
        onDrop(photo.id)
      }}
      onDragEnd={onDragEnd}
      onClick={() => onSelect(photo.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(photo.id)
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={cn(
        'group relative w-40 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-muted outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 active:cursor-grabbing',
        setupPhotoFrameClassName('square'),
        isSelected
          ? 'ring-2 ring-primary ring-offset-2 ring-offset-card'
          : 'ring-1 ring-border/70',
        isDragging && 'opacity-50',
      )}
    >
      <div className="flex size-full items-center justify-center">
        <img
          src={photo.previewUrl}
          alt="Setup photo"
          className="block max-h-full max-w-full"
          draggable={false}
        />
      </div>

      <button
        type="button"
        aria-label="Remove photo"
        onClick={(event) => {
          event.stopPropagation()
          onRemove(photo.id)
        }}
        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-background/95 text-foreground shadow-sm transition-colors hover:bg-background"
      >
        <Icon name="x" className="size-3.5" />
      </button>

      {isCover ? (
        <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-background/95 px-2 py-1 text-xs font-medium text-foreground shadow-sm">
          <Icon name="star" className="size-3 text-chart-4" />
          Cover
        </div>
      ) : null}
    </div>
  )
}

export default PhotoGalleryItem
