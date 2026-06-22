import type { UploadAdapter } from 'react-upload-kit'

export type SetupImageUploadResponse = {
  url: string
  key: string
  width: number
  height: number
}

function rejectOnAbort(signal: AbortSignal) {
  return new Promise<never>((_, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Upload aborted', 'AbortError'))
      return
    }

    signal.addEventListener(
      'abort',
      () => reject(new DOMException('Upload aborted', 'AbortError')),
      { once: true },
    )
  })
}

export function createSetupImageUploadAdapter(
  upload: (file: File) => Promise<SetupImageUploadResponse>,
): UploadAdapter<SetupImageUploadResponse> {
  return async (file, { onProgress, signal }) => {
    if (signal.aborted) {
      throw new DOMException('Upload aborted', 'AbortError')
    }

    onProgress(0)

    const result = await Promise.race([upload(file), rejectOnAbort(signal)])

    onProgress(100)

    return result
  }
}
