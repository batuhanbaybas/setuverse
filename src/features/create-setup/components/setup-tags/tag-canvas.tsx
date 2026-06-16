import type { MouseEvent } from 'react'

import SetupImage from '#/shared/components/setup-image'
import { Button } from '#/shared/components/ui/button'
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
        {items.map((item, index) => (
          <Button
            key={item.id}
            type="button"
            size="icon-xs"
            variant={activeItemId === item.id ? 'default' : 'secondary'}
            className={cn(
              'absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md',
              activeItemId === item.id &&
                'ring-2 ring-primary ring-offset-2',
            )}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            onClick={(event) => {
              event.stopPropagation()
              onMarkerClick(item.id)
            }}
            aria-label={`Tag ${index + 1}: ${item.name}`}
          >
            <span className="text-xs font-semibold">{index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default TagCanvas
