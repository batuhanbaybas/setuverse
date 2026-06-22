import { putR2Object } from '#/features/setup/lib/r2'

import { SETUP_IMAGE_MAX_FILE_SIZE } from '../../lib/upload-config'
import { resolveImageContentType } from '../../lib/upload-utils'
import { SETUP_IMAGE_KEY_PREFIX } from './constants'
import { optimizeSetupImageForUpload } from './optimize-setup-image'

export type SetupImageUploadResult = {
  url: string
  key: string
  width: number
  height: number
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
  const originalBody = Buffer.from(await file.arrayBuffer())
  const optimized = await optimizeSetupImageForUpload(originalBody, contentType)
  const key = `${SETUP_IMAGE_KEY_PREFIX}${userId}/${crypto.randomUUID()}${optimized.extension}`

  return {
    ...(await putR2Object({
      key,
      body: optimized.body,
      contentType: optimized.contentType,
    })),
    width: optimized.width,
    height: optimized.height,
  }
}
