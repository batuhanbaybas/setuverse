import SetupImage from '#/shared/components/setup-card/setup-image'
import { Button } from '#/shared/components/ui/button'
import Tooltip from '#/shared/components/ui/tooltip-root'
import { cn } from '#/shared/lib/utils'

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
  return (
    <div className="flex h-[min(70vh,640px)] items-center justify-center rounded-xl border bg-muted/20 p-2 sm:p-4">
      <div className="relative max-w-full">
        <SetupImage
          imageUrl={imageUrl}
          alt="Setup preview"
          className="block max-h-[calc(min(70vh,640px)-1rem)] w-auto max-w-full rounded-lg object-contain sm:max-h-[calc(min(70vh,640px)-2rem)]"
        />
        {items.map((item, index) => {
          const isActive = activeItemId === item.id

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
                      'absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform sm:size-7',
                      isActive
                        ? 'scale-110 bg-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-background'
                        : 'bg-primary/85 hover:scale-110 hover:bg-primary',
                    )}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
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
