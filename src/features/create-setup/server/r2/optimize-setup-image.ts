import sharp from 'sharp'

const EXTENSION_BY_CONTENT_TYPE: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
  'image/svg+xml': '.svg',
}

const SKIP_METADATA_PROCESSING = new Set([
  'image/gif',
  'image/svg+xml',
])

export type OptimizedSetupImage = {
  body: Buffer
  contentType: string
  extension: string
  width: number
  height: number
}

async function readImageDimensions(body: Buffer): Promise<{ width: number; height: number }> {
  const metadata = await sharp(body, { failOn: 'none' }).metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read image dimensions')
  }

  return { width: metadata.width, height: metadata.height }
}

async function toOptimizedSetupImage(
  body: Buffer,
  contentType: string,
): Promise<OptimizedSetupImage> {
  const { width, height } = await readImageDimensions(body)

  return {
    body,
    contentType,
    extension: EXTENSION_BY_CONTENT_TYPE[contentType] ?? '',
    width,
    height,
  }
}

function createSharpPipeline(input: Buffer) {
  return sharp(input, { failOn: 'none' }).rotate()
}

async function encodeWithoutMetadata(
  input: Buffer,
  contentType: string,
): Promise<OptimizedSetupImage> {
  const pipeline = createSharpPipeline(input)

  switch (contentType) {
    case 'image/jpeg':
      return toOptimizedSetupImage(
        await pipeline.jpeg({ quality: 100, mozjpeg: true }).toBuffer(),
        'image/jpeg',
      )

    case 'image/png': {
      const [webpLossless, pngOptimized] = await Promise.all([
        pipeline.clone().webp({ lossless: true, effort: 6 }).toBuffer(),
        pipeline.clone().png({ compressionLevel: 9, effort: 10 }).toBuffer(),
      ])

      const candidates = await Promise.all([
        toOptimizedSetupImage(webpLossless, 'image/webp'),
        toOptimizedSetupImage(pngOptimized, 'image/png'),
      ])

      return candidates.reduce((best, candidate) =>
        candidate.body.length < best.body.length ? candidate : best,
      )
    }

    case 'image/webp':
      return toOptimizedSetupImage(
        await pipeline.webp({ lossless: true, effort: 6 }).toBuffer(),
        'image/webp',
      )

    case 'image/avif':
      return toOptimizedSetupImage(
        await pipeline.avif({ lossless: true }).toBuffer(),
        'image/avif',
      )

    case 'image/heic':
      return toOptimizedSetupImage(
        await pipeline.jpeg({ quality: 100, mozjpeg: true }).toBuffer(),
        'image/jpeg',
      )

    default:
      return toOptimizedSetupImage(input, contentType)
  }
}

export async function optimizeSetupImageForUpload(
  input: Buffer,
  contentType: string,
): Promise<OptimizedSetupImage> {
  if (SKIP_METADATA_PROCESSING.has(contentType)) {
    return toOptimizedSetupImage(input, contentType)
  }

  try {
    return await encodeWithoutMetadata(input, contentType)
  } catch {
    return toOptimizedSetupImage(input, contentType)
  }
}
