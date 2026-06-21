import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

function getR2Config() {
  const endpoint = process.env.R2_ENDPOINT
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucketName = process.env.R2_BUCKET_NAME
  const publicUrl = process.env.R2_PUBLIC_URL

  if (!endpoint || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    throw new Error('Cloudflare R2 environment variables are not configured')
  }

  return {
    endpoint,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl: publicUrl.replace(/\/$/, ''),
  }
}

export function getR2Client() {
  const { endpoint, accessKeyId, secretAccessKey } = getR2Config()

  return new S3Client({
    region: 'auto',
    endpoint,
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

export type R2ListedObject = {
  key: string
  size: number
  lastModified: Date
}

export async function listR2Objects({
  prefix,
}: {
  prefix: string
}): Promise<R2ListedObject[]> {
  const { bucketName } = getR2Config()
  const client = getR2Client()
  const objects: R2ListedObject[] = []
  let continuationToken: string | undefined

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    )

    for (const object of response.Contents ?? []) {
      if (!object.Key || object.Key.endsWith('/')) {
        continue
      }

      objects.push({
        key: object.Key,
        size: object.Size ?? 0,
        lastModified: object.LastModified ?? new Date(0),
      })
    }

    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined
  } while (continuationToken)

  return objects
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
