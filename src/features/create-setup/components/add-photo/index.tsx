import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Card from '#/shared/components/ui/card'
import type {
  CreateSetupFormValues,
  SetupPhoto,
} from '../../lib/create-setup-form'
import CardHeader from '../../shared/card-header'
import EmptyState from './empty-state'
import HasPhoto from './has-photo'
import PhotoCropDialog from './photo-crop-dialog'

type CropState = {
  sourceFile: File
  imageSrc: string
}

function AddPhoto() {
  const { control, setValue } = useFormContext<CreateSetupFormValues>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photo = useWatch({ control, name: 'photo' }) as SetupPhoto | undefined
  const previewUrlRef = useRef<string | undefined>(undefined)
  const [cropState, setCropState] = useState<CropState | null>(null)
  previewUrlRef.current = photo?.previewUrl

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  const revokeCropPreview = (state: CropState | null) => {
    if (state?.imageSrc) {
      URL.revokeObjectURL(state.imageSrc)
    }
  }

  const openCropper = (sourceFile: File) => {
    revokeCropPreview(cropState)
    setCropState({
      sourceFile,
      imageSrc: URL.createObjectURL(sourceFile),
    })
  }

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return
    }

    openCropper(file)
  }

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      handleFileSelected(file)
    }

    event.target.value = ''
  }

  const handleCropCancel = () => {
    revokeCropPreview(cropState)
    setCropState(null)
  }

  const handleCropComplete = (croppedFile: File, previewUrl: string) => {
    if (!cropState) {
      return
    }

    if (photo?.previewUrl) {
      URL.revokeObjectURL(photo.previewUrl)
    }

    setValue(
      'photo',
      {
        file: croppedFile,
        previewUrl,
        sourceFile: cropState.sourceFile,
      },
      { shouldDirty: true },
    )

    revokeCropPreview(cropState)
    setCropState(null)
  }

  const handleRemovePhoto = () => {
    if (photo?.previewUrl) {
      URL.revokeObjectURL(photo.previewUrl)
    }

    setValue('photo', undefined, { shouldDirty: true })
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleEditCrop = () => {
    if (!photo) {
      return
    }

    openCropper(photo.sourceFile)
  }

  return (
    <div className="col-span-12 md:col-span-8">
      <Card
        cardHeaderProps={{
          className: 'gap-3',
          children: <CardHeader step={1} title="Add Photo" description="Upload a cover photo for your setup. This will be the first thing people see." />,
        }}
        cardContentProps={{
          children: (
            <>
              {photo ? (
                <HasPhoto
                  photo={photo}
                  onEditCrop={handleEditCrop}
                  openFilePicker={openFilePicker}
                  handleRemovePhoto={handleRemovePhoto}
                />
              ) : (
                <EmptyState onFileSelect={handleFileSelected} />
              )}

              <input
                id="setup-photo-input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAddPhoto}
              />
            </>
          ),
        }}
      />

      {cropState ? (
        <PhotoCropDialog
          key={cropState.imageSrc}
          open
          imageSrc={cropState.imageSrc}
          fileName={cropState.sourceFile.name}
          onOpenChange={() => undefined}
          onCancel={handleCropCancel}
          onComplete={handleCropComplete}
        />
      ) : null}
    </div>
  )
}

export default AddPhoto
