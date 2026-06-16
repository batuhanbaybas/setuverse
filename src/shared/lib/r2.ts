import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucketName = process.env.R2_BUCKET_NAME
  const publicUrl = process.env.R2_PUBLIC_URL

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    throw new Error('Cloudflare R2 environment variables are not configured')
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl: publicUrl.replace(/\/$/, ''),
  }
}

export function getR2Client() {
  const { accountId, accessKeyId, secretAccessKey } = getR2Config()

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
  })
}

export function getR2PublicUrl(key: string) {
  const { publicUrl } = getR2Config()
  return `${publicUrl}/${key}`
}



export async function putR2Object({
  key,
  body,
  contentType,
}: {
  key: string
  body: Buffer | Uint8Array
  contentType: string
}) {
  const { bucketName } = getR2Config()

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  )

  return {
    url: getR2PublicUrl(key),
    key,
  }
}

export async function deleteR2Object({ key }: { key: string }) {
  const { bucketName } = getR2Config()

  await getR2Client().send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    }),
  )
}

export async function createR2UploadUrl({
  key,
  contentType,
  expiresIn = 600,
}: {
  key: string
  contentType: string
  expiresIn?: number
}) {
  const { bucketName } = getR2Config()

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  })

  const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn })

  return {
    uploadUrl,
    url: getR2PublicUrl(key),
    key,
  }
}
