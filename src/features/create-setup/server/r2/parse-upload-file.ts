export function parseUploadFile(entry: FormDataEntryValue | null): File | null {
  if (!entry || typeof entry === 'string') {
    return null
  }

  const fileLike = entry as File | Blob

  if (fileLike instanceof File) {
    return fileLike
  }

  return new File([fileLike], 'upload', {
    type: fileLike.type || 'application/octet-stream',
  })
}
