import { deleteR2Object } from '#/shared/lib/r2'

const SETUP_IMAGE_KEY_PREFIX = 'setups/'

export function isOwnedSetupImageKey(key: string, userId: string) {
  return key.startsWith(`${SETUP_IMAGE_KEY_PREFIX}${userId}/`)
}

export async function deleteSetupImage({
  key,
  userId,
}: {
  key: string
  userId: string
}) {
  if (!isOwnedSetupImageKey(key, userId)) {
    throw new Error('You can only delete your own setup images')
  }

  await deleteR2Object({ key })
}
