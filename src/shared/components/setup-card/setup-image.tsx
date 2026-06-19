import { forwardRef, type ImgHTMLAttributes } from 'react'

import { cn } from '#/shared/lib/utils'

type SetupImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  imageUrl: string | null | undefined
}

const SetupImage = forwardRef<HTMLImageElement, SetupImageProps>(
  function SetupImage({ imageUrl, className, alt, ...props }, ref) {
    return (
      <img
        ref={ref}
        src={imageUrl ?? ''}
        alt={alt}
        className={cn(className)}
        {...props}
      />
    )
  },
)

export default SetupImage
