import Icon from '#/shared/components/icons'
import { cn } from '#/shared/lib/utils'
import type { SetupPinDraft } from '../../lib/create-setup-form'
import { setupPhotoFrameClassName } from '../shared/setup-photo-frame'

type PhotoTagCanvasProps = {
  imageSrc: string
  pins: SetupPinDraft[]
  onAddPin: (x: number, y: number) => void
  onRemovePin: (pinId: string) => void
}

function PhotoTagCanvas({
  imageSrc,
  pins,
  onAddPin,
  onRemovePin,
}: PhotoTagCanvasProps) {
  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('[data-pin-marker]')) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    onAddPin(x, y)
  }

  return (
    <div
      className={cn(
        'flex w-full cursor-crosshair items-center justify-center overflow-hidden rounded-xl bg-muted',
        setupPhotoFrameClassName('video'),
      )}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="Tag equipment on photo"
        onClick={handleCanvasClick}
        onKeyDown={() => undefined}
        className="relative inline-block max-h-full max-w-full"
      >
        <img
          src={imageSrc}
          alt="Setup photo for tagging"
          className="block max-h-full max-w-full"
          draggable={false}
        />

        {pins.map((pin, index) => (
          <button
            key={pin.id}
            type="button"
            data-pin-marker
            aria-label={`Remove tag ${index + 1}`}
            className={cn(
              'absolute z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-110 focus-visible:ring-[3px] focus-visible:ring-ring/50',
            )}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onClick={(event) => {
              event.stopPropagation()
              onRemovePin(pin.id)
            }}
          >
            <Icon name="plus" className="size-4" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default PhotoTagCanvas
