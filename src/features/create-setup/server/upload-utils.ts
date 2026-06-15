import { S3ServiceException } from '@aws-sdk/client-s3'

function parseUploadFile(entry: FormDataEntryValue | null): File | null {
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

type UploadErrorDetails = {
  message: string
  code?: string
  status: number
}

function getUploadErrorDetails(error: unknown): UploadErrorDetails {
  if (error instanceof S3ServiceException) {
    if (error.name === 'AccessDenied') {
      const bucketName = process.env.R2_BUCKET_NAME ?? 'unknown'

      return {
        code: error.name,
        status: 500,
        message: `R2 access denied for bucket "${bucketName}". Recreate the R2 API token with Object Read & Write on this bucket, then restart the dev server.`,
      }
    }

    return {
      code: error.name,
      status: 502,
      message: error.message,
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('Cloudflare R2 environment variables')) {
      return {
        code: 'R2ConfigError',
        status: 500,
        message: error.message,
      }
    }

    return {
      status: 400,
      message: error.message,
    }
  }

  return {
    status: 500,
    message: 'Upload failed',
  }
}

export { getUploadErrorDetails, parseUploadFile }
export type { UploadErrorDetails }
