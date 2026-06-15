import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

function requireEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name}`)
  }

  return value
}

const accountId = requireEnv('R2_ACCOUNT_ID')
const accessKeyId = requireEnv('R2_ACCESS_KEY_ID')
const secretAccessKey = requireEnv('R2_SECRET_ACCESS_KEY')
const bucketName = requireEnv('R2_BUCKET_NAME')
const publicUrl = requireEnv('R2_PUBLIC_URL').replace(/\/$/, '')

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
})

const key = `setups/test/${crypto.randomUUID()}.png`
const body = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

try {
  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: 'image/png',
    }),
  )

  console.log('R2 upload OK')
  console.log(`Bucket: ${bucketName}`)
  console.log(`Key: ${key}`)
  console.log(`Public URL: ${publicUrl}/${key}`)
} catch (error) {
  const name = error instanceof Error ? error.name : 'UnknownError'
  const message = error instanceof Error ? error.message : String(error)

  console.error('R2 upload failed')
  console.error(`Account ID: ${accountId}`)
  console.error(`Bucket: ${bucketName}`)
  console.error(`Error: ${name} — ${message}`)

  if (name === 'AccessDenied') {
    console.error('')
    console.error(
      'Fix: R2 → Manage R2 API Tokens → create token with Object Read & Write on this bucket.',
    )
    console.error(
      'Ensure R2_ACCOUNT_ID matches the account where the bucket and token were created.',
    )
  }

  process.exit(1)
}
