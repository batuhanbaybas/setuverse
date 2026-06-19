import { useCallback, useMemo, useState } from 'react'
import { useUploader } from 'react-upload-kit'

import SetupImage from '#/shared/components/setup-card/setup-image'
import { Button } from '#/shared/components/ui/button'
import Icon from '#/shared/components/icons'

import { createSetupImageUploadAdapter } from '../../lib/setup-image-upload-adapter'
import {
  SETUP_IMAGE_ACCEPT,
  SETUP_IMAGE_MAX_FILE_SIZE,
  SETUP_IMAGE_MAX_FILES,
} from '../../lib/upload-config'
import useUploadSetupImage from '../../service/use-upload-setup-image'
import useUpdateSetupImageUrl from '../../service/use-update-setup-image-url'
import UploadDropzone from '../setup-image-upload/upload-dropzone'

type ReviewImageSectionProps = {
  setupId: string
  imageUrl: string | null
}

function ReviewImageSection({ setupId, imageUrl }: ReviewImageSectionProps) {
  const [isChanging, setIsChanging] = useState(false)
  const updateImageUrl = useUpdateSetupImageUrl(setupId)

  const uploadSetupImage = useUploadSetupImage({
    onSuccess: async (response) => {
      await updateImageUrl.mutateAsync({
        setupId,
        imageUrl: response.url,
      })
      setIsChanging(false)
    },
  })

  const uploadAdapter = useMemo(
    () => createSetupImageUploadAdapter((file) => uploadSetupImage.mutateAsync(file)),
    [uploadSetupImage.mutateAsync],
  )

  const uploader = useUploader({
    adapter: uploadAdapter,
    accept: [...SETUP_IMAGE_ACCEPT],
    maxFileSize: SETUP_IMAGE_MAX_FILE_SIZE,
    maxFiles: SETUP_IMAGE_MAX_FILES,
    autoUpload: true,
    maxRetries: 0,
  })

  const handleDrop = useCallback(
    (files: File[]) => {
      uploader.addFiles(files)
    },
    [uploader],
  )

  const isUploading = uploadSetupImage.isPending || updateImageUrl.isPending

  if (isChanging) {
    return (
      <div className="space-y-3">
        <UploadDropzone onDrop={handleDrop} />

        {isUploading ? (
          <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
            <Icon name="loader" className="size-4 animate-spin" />
            Uploading...
          </div>
        ) : null}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsChanging(false)}
          disabled={isUploading}
        >
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center rounded-xl border bg-muted/20 p-2 sm:p-4">
        <SetupImage
          imageUrl={imageUrl}
          alt="Setup preview"
          className="max-w-full rounded-lg object-contain"
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsChanging(true)}
      >
        <Icon name="upload" />
        Change image
      </Button>
    </div>
  )
}

export default ReviewImageSection
