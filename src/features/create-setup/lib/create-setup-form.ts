import { z } from 'zod'

export type SetupPhoto = {
  id: string
  file: File
  previewUrl: string
}

export type SetupPinDraft = {
  id: string
  photoId: string
  x: number
  y: number
}

export type SetupEquipmentBody = {
  pinId: string
  name: string
  url: string
}

const setupPhotoSchema = z.object({
  id: z.string(),
  file: z.custom<File>((value) => value instanceof File),
  previewUrl: z.string(),
})

const setupPinSchema = z.object({
  id: z.string(),
  photoId: z.string(),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
})

export const createSetupFormSchema = z.object({
  photos: z.array(setupPhotoSchema),
  selectedPhotoId: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z
    .string()
    .trim()
    .max(500, 'Description must be 500 characters or less'),
  categoryId: z.string().min(1, 'Category is required'),
  pins: z.array(setupPinSchema),
})

export type CreateSetupFormValues = z.infer<typeof createSetupFormSchema>

export type CreateSetupSubmitBody = {
  title: string
  description: string
  categoryId: string
  photos: SetupPhoto[]
  pins: SetupPinDraft[]
  equipments: SetupEquipmentBody[]
}

export const createSetupDefaultValues: CreateSetupFormValues = {
  photos: [],
  selectedPhotoId: undefined,
  title: '',
  description: '',
  categoryId: '',
  pins: [],
}

export function buildCreateSetupSubmitBody(
  values: CreateSetupFormValues,
): CreateSetupSubmitBody {
  return {
    title: values.title,
    description: values.description,
    categoryId: values.categoryId,
    photos: values.photos,
    pins: values.pins,
    equipments: values.pins.map((pin) => ({
      pinId: pin.id,
      name: '',
      url: '',
    })),
  }
}

export function getCoverPhoto(photos: SetupPhoto[]) {
  return photos[0]
}

export function getSelectedPhoto(
  photos: SetupPhoto[],
  selectedPhotoId?: string,
) {
  if (!photos.length) {
    return undefined
  }

  if (selectedPhotoId) {
    const selected = photos.find((photo) => photo.id === selectedPhotoId)

    if (selected) {
      return selected
    }
  }

  return photos[0]
}

export function createSetupPhoto(file: File): SetupPhoto {
  return {
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
  }
}

export function reorderPhotos(
  photos: SetupPhoto[],
  fromId: string,
  toId: string,
) {
  const fromIndex = photos.findIndex((photo) => photo.id === fromId)
  const toIndex = photos.findIndex((photo) => photo.id === toId)

  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return photos
  }

  const next = [...photos]
  const [moved] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, moved)

  return next
}
