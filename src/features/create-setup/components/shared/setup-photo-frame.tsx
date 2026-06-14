import { cn } from '#/shared/lib/utils'

export type SetupPhotoFrameAspect = 'square' | 'video'

export function setupPhotoFrameClassName(aspect: SetupPhotoFrameAspect) {
  return aspect === 'square' ? 'aspect-square' : 'aspect-video'
}

type SetupPhotoFrameProps = {
  src: string
  alt: string
  aspect: SetupPhotoFrameAspect
  className?: string
}

function SetupPhotoFrame({ src, alt, aspect, className }: SetupPhotoFrameProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center overflow-hidden rounded-xl bg-muted',
        setupPhotoFrameClassName(aspect),
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="block max-h-full max-w-full"
        draggable={false}
      />
    </div>
  )
}

export default SetupPhotoFrame
