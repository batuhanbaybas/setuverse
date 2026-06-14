import { useEffect, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import Card from '#/shared/components/ui/card'
import type {
  CreateSetupFormValues,
  SetupPhoto,
} from '../../lib/create-setup-form'
import CardHeader from './card-header'
import EmptyState from './empty-state'
import HasPhoto from './has-photo'

function AddPhoto() {
  const { control, setValue } = useFormContext<CreateSetupFormValues>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photo = useWatch({ control, name: 'photo' }) as SetupPhoto | undefined
  const previewUrlRef = useRef<string | undefined>(undefined)
  previewUrlRef.current = photo?.previewUrl

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  const setPhoto = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return
    }

    if (photo?.previewUrl) {
      URL.revokeObjectURL(photo.previewUrl)
    }

    setValue(
      'photo',
      {
        file,
        previewUrl: URL.createObjectURL(file),
      },
      { shouldDirty: true },
    )
  }

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setPhoto(file)
    }

    event.target.value = ''
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

  return (
    <Card
      cardHeaderProps={{
        className: 'gap-3',
        children: <CardHeader />,
      }}
      cardContentProps={{
        children: (
          <>
            {photo ? (
              <HasPhoto
                photo={photo}
                openFilePicker={openFilePicker}
                handleRemovePhoto={handleRemovePhoto}
              />
            ) : (
              <EmptyState />
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
  )
}

export default AddPhoto
