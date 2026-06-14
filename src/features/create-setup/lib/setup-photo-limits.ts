export const SETUP_PHOTO_MAX_COUNT = 10

export const SETUP_PHOTO_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
export const SETUP_PHOTO_MAX_INPUT_DIMENSION = 6000

export const SETUP_PHOTO_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

export const SETUP_PHOTO_ACCEPT_ATTRIBUTE = SETUP_PHOTO_ACCEPTED_TYPES.join(',')

function loadImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.addEventListener('load', () => {
      URL.revokeObjectURL(url)
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      })
    })

    image.addEventListener('error', () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read image dimensions'))
    })

    image.src = url
  })
}

export type SetupPhotoValidationResult =
  | { ok: true }
  | { ok: false; error: string }

export async function validateSetupPhotoFile(
  file: File,
): Promise<SetupPhotoValidationResult> {
  if (
    !SETUP_PHOTO_ACCEPTED_TYPES.includes(
      file.type as (typeof SETUP_PHOTO_ACCEPTED_TYPES)[number],
    )
  ) {
    return {
      ok: false,
      error: 'Only JPG, PNG, and WEBP images are supported.',
    }
  }

  if (file.size > SETUP_PHOTO_MAX_FILE_SIZE_BYTES) {
    return {
      ok: false,
      error: 'Image must be 10 MB or smaller.',
    }
  }

  try {
    const { width, height } = await loadImageDimensions(file)
    const longestEdge = Math.max(width, height)

    if (longestEdge > SETUP_PHOTO_MAX_INPUT_DIMENSION) {
      return {
        ok: false,
        error: `Image dimensions must be ${SETUP_PHOTO_MAX_INPUT_DIMENSION}px or smaller.`,
      }
    }
  } catch {
    return {
      ok: false,
      error: 'Could not read the selected image.',
    }
  }

  return { ok: true }
}
