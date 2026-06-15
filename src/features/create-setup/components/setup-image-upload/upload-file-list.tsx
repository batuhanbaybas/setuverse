import { useState } from 'react'
import type { UploaderInstance } from 'react-upload-kit'

import { deleteSetupImageViaApi } from '../../lib/delete-setup-image-via-api'
import type { SetupImageUploadResponse } from '../../lib/setup-image-upload-adapter'
import UploadPreview from './upload-preview'

type UploadFileListProps = {
  uploader: UploaderInstance<SetupImageUploadResponse>
}

function UploadFileList({ uploader }: UploadFileListProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [removeError, setRemoveError] = useState<string | null>(null)
  const file = uploader.files[0]

  if (!file) {
    return null
  }

  const handleRemove = async () => {
    if (isRemoving) {
      return
    }

    setIsRemoving(true)
    setRemoveError(null)

    try {
      if (file.status === 'success' && file.response?.key) {
        await deleteSetupImageViaApi(file.response.key)
      }

      uploader.removeFile(file.id)
    } catch (error) {
      setRemoveError(
        error instanceof Error ? error.message : 'Could not remove image. Try again.',
      )
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <UploadPreview
      file={file}
      isRemoving={isRemoving}
      removeError={removeError}
      onRemove={handleRemove}
      onRetry={() => uploader.retryFile(file.id)}
      onCancel={() => uploader.cancelFile(file.id)}
    />
  )
}

export default UploadFileList
