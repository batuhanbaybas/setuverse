import { Dropzone } from 'react-upload-kit/components'

import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

import {
  SETUP_IMAGE_ACCEPT,
  SETUP_IMAGE_MAX_FILE_SIZE,
  SETUP_IMAGE_MAX_FILES,
} from '../../lib/upload-config'

type UploadDropzoneProps = {
  onDrop: (files: File[]) => void
}

function UploadDropzone({ onDrop }: UploadDropzoneProps) {
  return (
    <Dropzone
      onDrop={onDrop}
      accept={[...SETUP_IMAGE_ACCEPT]}
      maxFiles={SETUP_IMAGE_MAX_FILES}
      maxFileSize={SETUP_IMAGE_MAX_FILE_SIZE}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject, open }) => (
        <div
          {...getRootProps()}
          className={cn(
            'group flex min-h-120 cursor-pointer flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-all',
            'hover:border-primary/60 hover:bg-primary/5',
            isDragActive &&
              !isDragReject &&
              'scale-[1.01] border-primary bg-primary/5 shadow-sm',
            isDragReject && 'border-destructive bg-destructive/5 text-destructive',
          )}
        >
          <input {...getInputProps()} />

          <div
            className={cn(
              'flex size-16 items-center justify-center rounded-2xl border bg-background shadow-sm transition-colors',
              isDragActive && !isDragReject
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'text-muted-foreground group-hover:border-primary/30 group-hover:text-primary',
            )}
          >
            <Icon name="image-plus" className="size-8" />
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-base font-medium">
              {isDragReject
                ? 'That file type is not supported'
                : isDragActive
                  ? 'Release to upload your image'
                  : 'Drag and drop your setup photo here'}
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={(event) => {
              event.stopPropagation()
              open()
            }}
          >
            <Icon name="upload" />
            Browse files
          </Button>
        </div>
      )}
    </Dropzone>
  )
}

export default UploadDropzone
