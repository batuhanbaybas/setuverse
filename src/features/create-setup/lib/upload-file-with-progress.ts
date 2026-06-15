import type { SetupImageUploadResponse } from './setup-image-upload-adapter'

const SETUP_IMAGE_UPLOAD_API = '/api/setup-image/upload'

export function uploadSetupImageViaApi(
  file: File,
  onProgress: (percent: number) => void,
  signal: AbortSignal,
) {
  return new Promise<SetupImageUploadResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('file', file)

    xhr.open('POST', SETUP_IMAGE_UPLOAD_API)

    const handleAbort = () => {
      xhr.abort()
    }

    signal.addEventListener('abort', handleAbort, { once: true })

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    }

    xhr.onload = () => {
      signal.removeEventListener('abort', handleAbort)

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText) as SetupImageUploadResponse)
        } catch {
          reject(new Error('Upload succeeded but response was invalid'))
        }
        return
      }

      try {
        const payload = JSON.parse(xhr.responseText) as { error?: string }
        reject(new Error(payload.error ?? `Upload failed with status ${xhr.status}`))
      } catch {
        reject(new Error(`Upload failed with status ${xhr.status}`))
      }
    }

    xhr.onerror = () => {
      signal.removeEventListener('abort', handleAbort)
      reject(new Error('Network error during upload'))
    }

    xhr.onabort = () => {
      signal.removeEventListener('abort', handleAbort)
      reject(new DOMException('Upload aborted', 'AbortError'))
    }

    xhr.send(formData)
  })
}
