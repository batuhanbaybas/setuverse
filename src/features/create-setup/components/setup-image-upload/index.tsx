import { useUploader } from 'react-upload-kit'

import Card from '#/shared/components/ui/card'

import { setupImageUploadAdapter } from '../../lib/setup-image-upload-adapter'
import type { SetupImageUploadResponse } from '../../lib/setup-image-upload-adapter'
import {
  SETUP_IMAGE_ACCEPT,
  SETUP_IMAGE_MAX_FILE_SIZE,
  SETUP_IMAGE_MAX_FILES,
} from '../../lib/upload-config'
import UploadCardFooter from './upload-card-footer'
import UploadCardHeader from './upload-card-header'
import UploadDropzone from './upload-dropzone'
import UploadFileList from './upload-file-list'
import UploadRejections from './upload-rejections'

function SetupImageUpload() {
  




  const uploader = useUploader<SetupImageUploadResponse>({
    adapter: setupImageUploadAdapter,
    accept: [...SETUP_IMAGE_ACCEPT],
    maxFileSize: SETUP_IMAGE_MAX_FILE_SIZE,
    maxFiles: SETUP_IMAGE_MAX_FILES,
    autoUpload: true,
    maxRetries: 0,
  })

  const hasFile = uploader.files.length > 0
  const selectedFile = uploader.files[0]
  const isReady = hasFile && selectedFile.status === 'success'




  return (
    <section className="w-full">
      <Card
        wrapperProps={{ className: 'w-full' }}
        cardHeaderProps={{
          className: 'space-y-3 border-b pb-6',
          children: <UploadCardHeader />,
        }}
        cardContentProps={{
          className: 'space-y-4 pt-2',
          children: (
            <>
              {!hasFile ? <UploadDropzone onDrop={uploader.addFiles}  /> : null}
              <UploadRejections rejections={uploader.rejections} />
              {hasFile ? <UploadFileList uploader={uploader} /> : null}
            </>
          ),
        }}
        cardFooterProps={{
          className:
            'flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between',
          children: <UploadCardFooter isReady={isReady} />,
        }}
      />
    </section>
  )
}

export default SetupImageUpload
