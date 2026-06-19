import type { MouseEvent } from "react"

const calculateImageRect = (event: MouseEvent<HTMLImageElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  return { x, y }
}

export default calculateImageRect