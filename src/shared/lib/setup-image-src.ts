const SETUP_IMAGE_KEY_PREFIX = 'setups/'

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
