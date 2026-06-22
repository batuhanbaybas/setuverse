import { useRef } from 'react'

import SetupImage from '#/shared/components/setup-card/setup-image'
import useContainedImageRect from '#/shared/hooks/use-contained-image-rect'
import { getContainedMarkerPositionStyle } from '#/shared/lib/contained-image-rect'
import { cn } from '#/shared/lib/utils'
import {
  getSetupMarkerPositionStyle,
  SETUP_TAGGED_IMAGE_CONTAINED_CLASS,
} from '#/shared/lib/setup-tagged-image-classes'

import type { AdminSetup } from '../server/get-admin-setups.functions'

type AdminSetupPreviewCanvasProps = {
  imageUrl: string
  items: AdminSetup['items']
  activeItemId?: string | null
  onMarkerClick?: (id: string) => void
}

function AdminSetupPreviewCanvas({
  imageUrl,
  items,
  activeItemId = null,
  onMarkerClick,
}: AdminSetupPreviewCanvasProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const renderRect = useContainedImageRect(imgRef)

  return (
    <div className="aspect-video w-full max-h-[min(70vh,560px)] overflow-hidden rounded-xl border bg-muted/20">
      <div className="relative size-full">
        <SetupImage
          ref={imgRef}
          imageUrl={imageUrl}
          alt="Setup preview"
          className={cn(SETUP_TAGGED_IMAGE_CONTAINED_CLASS, 'rounded-lg')}
        />
        {items.map((item, index) => {
          const isActive = activeItemId === item.id
          const markerStyle = renderRect
            ? getContainedMarkerPositionStyle(item.x, item.y, renderRect)
            : getSetupMarkerPositionStyle(item.x, item.y)

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                'absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform sm:size-7',
                isActive
                  ? 'scale-110 bg-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-background'
                  : 'bg-primary/85 hover:scale-110 hover:bg-primary',
              )}
              style={markerStyle}
              onClick={() => onMarkerClick?.(item.id)}
              aria-label={`Tag ${index + 1}: ${item.name}`}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AdminSetupPreviewCanvas
