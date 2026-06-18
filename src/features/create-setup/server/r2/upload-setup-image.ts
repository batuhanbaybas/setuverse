import { putR2Object } from '#/features/setup/lib/r2'

import { SETUP_IMAGE_MAX_FILE_SIZE } from '../../lib/upload-config'
import { resolveImageContentType } from '../../lib/upload-utils'
import { SETUP_IMAGE_KEY_PREFIX } from './constants'
import { getFileExtension } from './utils'

export type SetupImageUploadResult = {
  url: string
  key: string
}

export async function uploadSetupImage({
  file,
  userId,
}: {
  file: File
  userId: string
}): Promise<SetupImageUploadResult> {
  if (file.size > SETUP_IMAGE_MAX_FILE_SIZE) {
    throw new Error('Image must be 10 MB or smaller')
  }

  const contentType = resolveImageContentType(file)
  const extension = getFileExtension(file.name, contentType)
  const key = `${SETUP_IMAGE_KEY_PREFIX}${userId}/${crypto.randomUUID()}${extension}`
  const body = Buffer.from(await file.arrayBuffer())

  return putR2Object({
    key,
    body,
    contentType,
  })
}
