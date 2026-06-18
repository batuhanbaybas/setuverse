import type { ImgHTMLAttributes } from 'react'

import { cn } from '#/shared/lib/utils'

type SetupImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  imageUrl: string | null | undefined
}

function SetupImage({ imageUrl, className, alt, ...props }: SetupImageProps) {


  return <img src={imageUrl ?? ''} alt={alt} className={cn(className)} {...props} />
}

export default SetupImage
