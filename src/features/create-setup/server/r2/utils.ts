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
