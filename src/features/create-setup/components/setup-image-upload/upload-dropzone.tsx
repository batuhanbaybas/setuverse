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
            'group flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-6 text-center transition-all',
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
              'flex size-12 items-center justify-center rounded-xl border bg-background shadow-sm transition-colors',
              isDragActive && !isDragReject
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'text-muted-foreground group-hover:border-primary/30 group-hover:text-primary',
            )}
          >
            <Icon name="image-plus" className="size-6" />
          </div>

          <p className="text-sm font-medium">
            {isDragReject
              ? 'That file type is not supported'
              : isDragActive
                ? 'Release to upload your image'
                : 'Drag and drop your setup photo here'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <span className="rounded-full border bg-muted/40 px-2 py-0.5">JPG, PNG, WEBP</span>
            <span className="rounded-full border bg-muted/40 px-2 py-0.5">Max 10 MB</span>
          </div>

          <Button
            type="button"
            size="sm"
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
