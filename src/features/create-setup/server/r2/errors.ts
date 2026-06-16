import { S3ServiceException } from '@aws-sdk/client-s3'

export type UploadErrorDetails = {
  message: string
  code?: string
  status: number
}

export function getUploadErrorDetails(error: unknown): UploadErrorDetails {
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

export function toUploadError(error: unknown): Error {
  const { message } = getUploadErrorDetails(error)
  return new Error(message)
}
