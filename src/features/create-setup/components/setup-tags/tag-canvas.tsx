import type { MouseEvent } from 'react'

import SetupImage from '#/shared/components/setup-image'
import { cn } from '#/shared/lib/utils'

import type { SetupItem } from '../../lib/setup-item'

type TagCanvasProps = {
  imageUrl: string
  items: SetupItem[]
  activeItemId: string | null
  onImageClick: (position: { x: number; y: number }) => void
  onMarkerClick: (id: string) => void
}

function TagCanvas({
  imageUrl,
  items,
  activeItemId,
  onImageClick,
  onMarkerClick,
}: TagCanvasProps) {
  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    onImageClick({
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
    })
  }

  return (
    <div className="flex items-center justify-center rounded-xl border bg-muted/20 p-2 sm:p-4">
      <div className="relative inline-flex max-w-full">
        <SetupImage
          imageUrl={imageUrl}
          alt="Setup preview"
          className="max-w-full cursor-crosshair rounded-lg object-contain"
          onClick={handleImageClick}
        />
        {items.map((item, index) => {
          const isActive = activeItemId === item.id

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
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={(event) => {
                event.stopPropagation()
                onMarkerClick(item.id)
              }}
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

export default TagCanvas
