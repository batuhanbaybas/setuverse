import type { UploaderInstance } from 'react-upload-kit'

import useDeleteSetupImage from '../../service/setup-image/use-delete-setup-image'
import type { SetupImageUploadResponse } from '../../lib/setup-image-upload-adapter'
import { revokeFilePreviewUrl } from '../../lib/file-preview-url'
import UploadPreview from './upload-preview'

type UploadFileListProps = {
  uploader: UploaderInstance<SetupImageUploadResponse>
  onImageRemoved: () => void
}

function UploadFileList({ uploader, onImageRemoved }: UploadFileListProps) {
  const deleteSetupImage = useDeleteSetupImage()
  const file = uploader.files[0]

  const finalizeRemoval = () => {
    uploader.removeFile(file.id)
    revokeFilePreviewUrl(file.id)
    onImageRemoved()
    deleteSetupImage.reset()
  }

  const handleRemove = () => {
    if (deleteSetupImage.isPending) {
      return
    }

    const key = file.status === 'success' ? file.response?.key : undefined

    if (!key) {
      finalizeRemoval()
      return
    }

    deleteSetupImage.mutate(key, {
      onSuccess: finalizeRemoval,
    })
  }

  const removeError = deleteSetupImage.isError ? deleteSetupImage.error.message : null

  return (
    <UploadPreview
      file={file}
      isRemoving={deleteSetupImage.isPending}
      removeError={removeError}
      onRemove={handleRemove}
      onRetry={() => uploader.retryFile(file.id)}
      onCancel={() => {
        revokeFilePreviewUrl(file.id)
        uploader.cancelFile(file.id)
      }}
    />
  )
}

export default UploadFileList
