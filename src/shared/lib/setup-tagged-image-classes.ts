export const SETUP_TAGGED_IMAGE_NATURAL_CLASS =
  'block h-auto w-full max-w-full'

export const SETUP_TAGGED_IMAGE_CONTAINED_CLASS =
  'block size-full object-contain'

/** @deprecated Use SETUP_TAGGED_IMAGE_NATURAL_CLASS or SETUP_TAGGED_IMAGE_CONTAINED_CLASS */
export const SETUP_TAGGED_IMAGE_CLASS = SETUP_TAGGED_IMAGE_NATURAL_CLASS

export function getSetupMarkerPositionStyle(x: number, y: number) {
  return {
    left: `${x}%`,
    top: `${y}%`,
  } as const
}
