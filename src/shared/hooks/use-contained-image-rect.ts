import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

import {
  getContainedImageRect,
  type ContainedImageRect,
} from '#/shared/lib/contained-image-rect'

function useContainedImageRect(
  imgRef: RefObject<HTMLImageElement | null>,
) {
  const [rect, setRect] = useState<ContainedImageRect | null>(null)

  useEffect(() => {
    const img = imgRef.current

    if (!img) {
      return
    }

    const updateRect = () => {
      const nextRect = getContainedImageRect(img)
      setRect(nextRect)
    }

    updateRect()

    if (!img.complete) {
      img.addEventListener('load', updateRect)
    }

    const observer = new ResizeObserver(updateRect)
    observer.observe(img)

    return () => {
      img.removeEventListener('load', updateRect)
      observer.disconnect()
    }
  }, [imgRef, imgRef.current?.src])

  return rect
}

export default useContainedImageRect
