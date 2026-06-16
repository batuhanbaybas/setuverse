const previewUrls = new Map<string, string>()

export function getFilePreviewUrl(fileId: string, file: Blob) {
  const existing = previewUrls.get(fileId)

  if (existing) {
    return existing
  }

  const url = URL.createObjectURL(file)
  previewUrls.set(fileId, url)
  return url
}

export function revokeFilePreviewUrl(fileId: string) {
  const url = previewUrls.get(fileId)

  if (!url) {
    return
  }

  URL.revokeObjectURL(url)
  previewUrls.delete(fileId)
}
