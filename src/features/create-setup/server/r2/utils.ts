import { SETUP_IMAGE_KEY_PREFIX } from './constants'

export function getFileExtension(fileName: string, contentType: string) {
  const fromName = fileName.includes('.')
    ? fileName.slice(fileName.lastIndexOf('.')).toLowerCase()
    : ''

  if (/^\.[a-z0-9]+$/.test(fromName)) {
    return fromName
  }

  const extensionByContentType: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/avif': '.avif',
    'image/svg+xml': '.svg',
  }

  return extensionByContentType[contentType] ?? ''
}

export function isOwnedSetupImageKey(key: string, userId: string) {
  return key.startsWith(`${SETUP_IMAGE_KEY_PREFIX}${userId}/`)
}

export function getSetupImageKeyFromUrl(url: string, publicUrl: string) {
  try {
    const normalizedPublicUrl = publicUrl.replace(/\/$/, '')
    const parsedUrl = new URL(url)
    const parsedPublicUrl = new URL(normalizedPublicUrl)

    if (parsedUrl.origin !== parsedPublicUrl.origin) {
      return null
    }

    const key = parsedUrl.pathname.replace(/^\//, '')

    if (!key.startsWith(SETUP_IMAGE_KEY_PREFIX)) {
      return null
    }

    return key
  } catch {
    return null
  }
}

export function isOwnedSetupImageUrl(
  url: string,
  userId: string,
  publicUrl: string,
) {
  const key = getSetupImageKeyFromUrl(url, publicUrl)

  if (!key) {
    return false
  }

  return isOwnedSetupImageKey(key, userId)
}
