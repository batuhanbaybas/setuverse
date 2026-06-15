import type { UploadFile } from 'react-upload-kit'

const EXTENSION_TO_CONTENT_TYPE: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.heic': 'image/heic',
}

export function resolveImageContentType(file: File) {
  if (file.type.startsWith('image/')) {
    return file.type
  }

  const extension = file.name.includes('.')
    ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    : ''
  const contentType = EXTENSION_TO_CONTENT_TYPE[extension]

  if (!contentType) {
    throw new Error(
      'Could not determine image type. Use a supported format (JPEG, PNG, WebP, GIF).',
    )
  }

  return contentType
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function getUploadStatusMeta(status: UploadFile['status']) {
  switch (status) {
    case 'pending':
      return { label: 'Ready to upload', variant: 'secondary' as const }
    case 'uploading':
      return { label: 'Uploading', variant: 'secondary' as const }
    case 'success':
      return { label: 'Upload complete', variant: 'default' as const }
    case 'error':
      return { label: 'Upload failed', variant: 'destructive' as const }
    case 'cancelled':
      return { label: 'Cancelled', variant: 'outline' as const }
  }
}
