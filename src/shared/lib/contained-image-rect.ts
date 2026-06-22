export type ContainedImageRect = {
  offsetX: number
  offsetY: number
  width: number
  height: number
  containerWidth: number
  containerHeight: number
}

export function getContainedImageRect(
  img: HTMLImageElement,
): ContainedImageRect | null {
  const { naturalWidth, naturalHeight } = img

  if (!naturalWidth || !naturalHeight) {
    return null
  }

  const { width: containerWidth, height: containerHeight } =
    img.getBoundingClientRect()
  const scale = Math.min(
    containerWidth / naturalWidth,
    containerHeight / naturalHeight,
  )
  const width = naturalWidth * scale
  const height = naturalHeight * scale

  return {
    offsetX: (containerWidth - width) / 2,
    offsetY: (containerHeight - height) / 2,
    width,
    height,
    containerWidth,
    containerHeight,
  }
}

export function getContainedMarkerPositionStyle(
  x: number,
  y: number,
  rect: ContainedImageRect,
) {
  const left = rect.offsetX + (x / 100) * rect.width
  const top = rect.offsetY + (y / 100) * rect.height

  return {
    left: `${(left / rect.containerWidth) * 100}%`,
    top: `${(top / rect.containerHeight) * 100}%`,
  } as const
}
