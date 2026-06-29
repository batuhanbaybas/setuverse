import { useRef } from 'react'

import SetupImage from '#/shared/components/setup-card/setup-image'
import { Button } from '#/shared/components/ui/button'
import Tooltip from '#/shared/components/ui/tooltip-root'
import useContainedImageRect from '#/shared/hooks/use-contained-image-rect'
import { getContainedMarkerPositionStyle } from '#/shared/lib/contained-image-rect'
import { cn } from '#/shared/lib/utils'
import {
  getSetupMarkerPositionStyle,
  SETUP_TAGGED_IMAGE_CONTAINED_CLASS,
} from '#/shared/lib/setup-tagged-image-classes'

import type { SetupDetailItem } from '../server/get-setup-detail'

type SetupDetailCanvasProps = {
  imageUrl: string
  items: SetupDetailItem[]
  activeItemId?: string | null
  onMarkerClick?: (id: string) => void
}

function SetupDetailCanvas({
  imageUrl,
  items,
  activeItemId = null,
  onMarkerClick,
}: SetupDetailCanvasProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const renderRect = useContainedImageRect(imgRef)

  return (
    <div className="aspect-video w-full max-h-[min(70vh,720px)] overflow-hidden rounded-xl border bg-muted/20">
      <div className="relative size-full">
        <SetupImage
          ref={imgRef}
          imageUrl={imageUrl}
          alt="Setup preview"
          className={SETUP_TAGGED_IMAGE_CONTAINED_CLASS}
        />
        {items.map((item, index) => {
          const isActive = activeItemId === item.id
          const markerStyle = renderRect
            ? getContainedMarkerPositionStyle(item.x, item.y, renderRect)
            : getSetupMarkerPositionStyle(item.x, item.y)

          return (
            <Tooltip
              key={item.id}
              triggerProps={{
                asChild: true,
                children: (
                  <Button
                    variant="outline"
                    size="icon-xs"
                    className={cn(
                      'absolute hidden md:inline-flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform sm:size-7',
                      isActive
                        ? 'scale-110 bg-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-background'
                        : 'bg-primary/60 hover:scale-110 hover:bg-primary/85',
                    )}
                    style={markerStyle}
                    onClick={() => onMarkerClick?.(item.id)}
                    aria-label={`Tag ${index + 1}: ${item.name}`}
                  >
                    {index + 1}
                  </Button>
                ),
              }}
              contentProps={{
                title: item.name,
                href: item.url || undefined,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SetupDetailCanvas
