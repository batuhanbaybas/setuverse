import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Card from '#/shared/components/ui/card'
import {
  createSetupPhoto,
  getSelectedPhoto,
  reorderPhotos,
} from '../../lib/create-setup-form'
import type { CreateSetupFormValues } from '../../lib/create-setup-form'
import {
  SETUP_PHOTO_ACCEPT_ATTRIBUTE,
  SETUP_PHOTO_MAX_COUNT,
  validateSetupPhotoFile,
} from '../../lib/setup-photo-limits'
import CardHeader from '../../shared/card-header'
import EmptyState from './empty-state'
import PhotoGallery from './photo-gallery'
import UploadFeedback from './upload-feedback'

function AddPhoto() {
  const { control, setValue, getValues } = useFormContext<CreateSetupFormValues>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photos = useWatch({ control, name: 'photos' }) ?? []
  const selectedPhotoId = useWatch({ control, name: 'selectedPhotoId' })
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    return () => {
      getValues('photos').forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl)
      })
    }
  }, [getValues])

  const handleFileSelected = async (file: File) => {
    if (photos.length >= SETUP_PHOTO_MAX_COUNT) {
      setUploadError(`You can upload up to ${SETUP_PHOTO_MAX_COUNT} photos.`)
      return
    }

    setIsValidating(true)
    setUploadError(null)

    try {
      const validation = await validateSetupPhotoFile(file)

      if (!validation.ok) {
        setUploadError(validation.error)
        return
      }

      const nextPhoto = createSetupPhoto(file)

      setValue('photos', [...getValues('photos'), nextPhoto], {
        shouldDirty: true,
      })
      setValue('selectedPhotoId', nextPhoto.id, { shouldDirty: true })
    } finally {
      setIsValidating(false)
    }
  }

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      void handleFileSelected(file)
    }

    event.target.value = ''
  }

  const removePhoto = (photoId: string) => {
    const currentPhotos = getValues('photos')
    const photoToRemove = currentPhotos.find((photo) => photo.id === photoId)

    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.previewUrl)
    }

    const nextPhotos = currentPhotos.filter((photo) => photo.id !== photoId)

    setValue('photos', nextPhotos, { shouldDirty: true })

    setValue(
      'pins',
      getValues('pins').filter((pin) => pin.photoId !== photoId),
      { shouldDirty: true },
    )

    const nextSelectedPhoto = getSelectedPhoto(nextPhotos, selectedPhotoId)?.id

    setValue('selectedPhotoId', nextSelectedPhoto, { shouldDirty: true })
    setUploadError(null)
  }

  const handleReorder = (fromId: string, toId: string) => {
    setValue('photos', reorderPhotos(getValues('photos'), fromId, toId), {
      shouldDirty: true,
    })
  }

  const handleSelectPhoto = (photoId: string) => {
    setValue('selectedPhotoId', photoId, { shouldDirty: true })
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const hasPhotos = photos.length > 0
  const canAddMore = photos.length < SETUP_PHOTO_MAX_COUNT

  return (
    <div className="col-span-12 md:col-span-8">
      <Card
        cardHeaderProps={{
          className: 'gap-3',
          children: (
            <CardHeader
              step={1}
              title="Photos"
              description="Upload one or more photos of your setup. Click a photo to tag equipment below."
            />
          ),
        }}
        cardContentProps={{
          className: hasPhotos ? 'pb-6' : 'flex min-h-72 flex-col',
          children: (
            <>
              {uploadError ? (
                <UploadFeedback
                  className="mb-4"
                  message={uploadError}
                  onDismiss={() => setUploadError(null)}
                />
              ) : null}

              {hasPhotos ? (
                <PhotoGallery
                  photos={photos}
                  selectedPhotoId={selectedPhotoId}
                  canAddMore={canAddMore}
                  onAddMore={openFilePicker}
                  onRemove={removePhoto}
                  onReorder={handleReorder}
                  onSelectPhoto={handleSelectPhoto}
                />
              ) : (
                <EmptyState
                  isValidating={isValidating}
                  onFileSelect={handleFileSelected}
                />
              )}

              <input
                id="setup-photo-input"
                ref={fileInputRef}
                type="file"
                accept={SETUP_PHOTO_ACCEPT_ATTRIBUTE}
                className="sr-only"
                disabled={isValidating || !canAddMore}
                onChange={handleAddPhoto}
              />
            </>
          ),
        }}
      />
    </div>
  )
}

export default AddPhoto
