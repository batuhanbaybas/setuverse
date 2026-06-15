import type { UploadAdapter } from 'react-upload-kit'

import { uploadSetupImageViaApi } from './upload-file-with-progress'

export type SetupImageUploadResponse = {
  url: string
  key: string
}

export const setupImageUploadAdapter: UploadAdapter<SetupImageUploadResponse> = async (
  file,
  { onProgress, signal },
) => {
  if (signal.aborted) {
    throw new DOMException('Upload aborted', 'AbortError')
  }

  onProgress(0)

  return uploadSetupImageViaApi(file, onProgress, signal)
}
