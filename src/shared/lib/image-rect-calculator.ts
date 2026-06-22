import type { MouseEvent } from 'react'

/**
 * Converts a click on a responsively scaled setup image into percentage
 * coordinates. Works when the image uses natural aspect ratio (w-full h-auto)
 * without object-fit letterboxing.
 */
const calculateImageRect = (event: MouseEvent<HTMLImageElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  return { x, y }
}

export default calculateImageRect