import type { Area } from 'react-easy-crop'
import {
  getSetupPhotoOutputSize,
  SETUP_PHOTO_JPEG_QUALITY,
} from './setup-photo-limits'

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', reject)
    image.src = url
  })
}

export async function getCroppedImage(
  imageSrc: string,
  pixelCrop: Area,
): Promise<Blob> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Could not get canvas context')
  }

  const outputSize = getSetupPhotoOutputSize(pixelCrop.width, pixelCrop.height)

  canvas.width = outputSize.width
  canvas.height = outputSize.height

  context.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize.width,
    outputSize.height,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Could not create cropped image'))
          return
        }

        resolve(blob)
      },
      'image/jpeg',
      SETUP_PHOTO_JPEG_QUALITY,
    )
  })
}
