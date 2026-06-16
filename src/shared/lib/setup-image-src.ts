const SETUP_IMAGE_KEY_PREFIX = 'setups/'
const KEY_SLASH_TOKEN = '--'
const KEY_DOT_TOKEN = '_dot_'

export function encodeSetupImageKey(imageKey: string) {
  return imageKey.replace(/\./g, KEY_DOT_TOKEN).replace(/\//g, KEY_SLASH_TOKEN)
}

export function decodeSetupImageKey(segment: string) {
  return segment.replaceAll(KEY_SLASH_TOKEN, '/').replaceAll(KEY_DOT_TOKEN, '.')
}

export function getSetupImageKeyFromUrl(imageUrl: string) {
  try {
    const key = new URL(imageUrl).pathname.replace(/^\//, '')

    if (!key.startsWith(SETUP_IMAGE_KEY_PREFIX)) {
      return null
    }

    return key
  } catch {
    return null
  }
}

export function resolveSetupImagePublicUrl(
  imageUrl: string | null | undefined,
  publicUrl: string,
) {
  if (!imageUrl) {
    return null
  }

  const imageKey = getSetupImageKeyFromUrl(imageUrl)

  if (!imageKey) {
    return imageUrl
  }

  return `${publicUrl.replace(/\/$/, '')}/${imageKey}`
}
  if (!imageUrl) {
    return undefined
  }

  const imageKey = getSetupImageKeyFromUrl(imageUrl)

  if (!imageKey) {
    return undefined
  }

  return `/api/media/${encodeSetupImageKey(imageKey)}`
}
