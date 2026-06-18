import { deleteR2Object } from '#/features/setup/lib/r2'

import { isOwnedSetupImageKey } from './utils'

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
