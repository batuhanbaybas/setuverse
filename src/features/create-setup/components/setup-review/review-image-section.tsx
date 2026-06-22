import { useCallback, useMemo, useState } from 'react'
import { useUploader } from 'react-upload-kit'

import SetupImage from '#/shared/components/setup-card/setup-image'
import { cn } from '#/shared/lib/utils'
import { SETUP_TAGGED_IMAGE_NATURAL_CLASS } from '#/shared/lib/setup-tagged-image-classes'
import { Button } from '#/shared/components/ui/button'
import Icon from '#/shared/components/icons'

import { createSetupImageUploadAdapter } from '../../lib/setup-image-upload-adapter'
import {
  SETUP_IMAGE_ACCEPT,
  SETUP_IMAGE_MAX_FILE_SIZE,
  SETUP_IMAGE_MAX_FILES,
} from '../../lib/upload-config'
import useUploadSetupImage from '../../service/setup-image/use-upload-setup-image'
import useUpdateSetupImageUrl from '../../service/setup-image/use-update-setup-image-url'
import UploadDropzone from '../setup-image-upload/upload-dropzone'
import { useParams } from '@tanstack/react-router'
import useGetSetupDraft from '../../service/use-get-setup-draft'

function ReviewImageSection() {
  const { id: setupId } = useParams({
    from: '/_main/_create/create/$id/review',
  })
  const [isChanging, setIsChanging] = useState(false)
  const updateImageUrl = useUpdateSetupImageUrl(setupId)
  const {data: setup} = useGetSetupDraft(setupId)
  const uploadSetupImage = useUploadSetupImage({
    onSuccess: async (response) => {
      await updateImageUrl.mutateAsync({
        setupId,
        imageUrl: response.url,
        imageWidth: response.width,
        imageHeight: response.height,
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
          imageUrl={setup?.imageUrl}
          alt="Setup preview"
          className={cn(SETUP_TAGGED_IMAGE_NATURAL_CLASS, 'rounded-lg')}
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
