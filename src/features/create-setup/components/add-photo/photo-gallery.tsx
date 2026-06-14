import { useState } from 'react'
import type { SetupPhoto } from '../../lib/create-setup-form'
import AddMoreTile from './add-more-tile'
import PhotoGalleryItem from './photo-gallery-item'

type PhotoGalleryProps = {
  photos: SetupPhoto[]
  selectedPhotoId?: string
  canAddMore: boolean
  onAddMore: () => void
  onRemove: (photoId: string) => void
  onReorder: (fromId: string, toId: string) => void
  onSelectPhoto: (photoId: string) => void
}

function PhotoGallery({
  photos,
  selectedPhotoId,
  canAddMore,
  onAddMore,
  onRemove,
  onReorder,
  onSelectPhoto,
}: PhotoGalleryProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto pb-1">
        {photos.map((photo, index) => (
          <PhotoGalleryItem
            key={photo.id}
            photo={photo}
            isCover={index === 0}
            isSelected={photo.id === (selectedPhotoId ?? photos[0]?.id)}
            isDragging={draggedId === photo.id}
            onSelect={onSelectPhoto}
            onRemove={onRemove}
            onDragStart={setDraggedId}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(photoId) => {
              if (draggedId) {
                onReorder(draggedId, photoId)
              }
              setDraggedId(null)
            }}
            onDragEnd={() => setDraggedId(null)}
          />
        ))}

        {canAddMore ? <AddMoreTile onClick={onAddMore} /> : null}
      </div>

      <p className="text-xs text-muted-foreground">
        Tip: First photo is the cover. Click a photo to tag equipment on it below.
      </p>
    </div>
  )
}

export default PhotoGallery
