import type { MouseEvent } from 'react'

import SetupImage from '#/shared/components/setup-image'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

import type { TagItemDraft } from '../../lib/tag-item-draft'

type TagCanvasProps = {
  imageUrl: string
  items: TagItemDraft[]
  activeItemId: string | null
  onImageClick: (position: { x: number; y: number }) => void
  onMarkerClick: (clientId: string) => void
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
    <div className="flex min-h-0 flex-1 items-center justify-center rounded-xl border bg-muted/20 p-2 sm:p-4">
      <div className="relative inline-flex max-h-[min(72vh,900px)] max-w-full">
        <SetupImage
          imageUrl={imageUrl}
          alt="Setup preview"
          className="max-h-[min(72vh,900px)] max-w-full cursor-crosshair rounded-lg object-contain"
          onClick={handleImageClick}
        />
        {items.map((item, index) => (
          <Button
            key={item.clientId}
            type="button"
            size="icon-xs"
            variant={activeItemId === item.clientId ? 'default' : 'secondary'}
            className={cn(
              'absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md',
              activeItemId === item.clientId &&
                'ring-2 ring-primary ring-offset-2',
            )}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            onClick={(event) => {
              event.stopPropagation()
              onMarkerClick(item.clientId)
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
