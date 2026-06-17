import SetupImage from '#/shared/components/setup-image'
import { cn } from '#/shared/lib/utils'

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
  return (
    <div className="flex items-center justify-center rounded-xl border bg-muted/20 p-2 sm:p-4">
      <div className="relative inline-flex max-w-full">
        <SetupImage
          imageUrl={imageUrl}
          alt="Setup preview"
          className="max-w-full rounded-lg object-contain"
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
