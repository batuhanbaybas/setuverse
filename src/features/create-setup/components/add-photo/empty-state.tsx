import { useState } from 'react'
import Icon from '#/shared/components/icons'
import { buttonVariants } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'
import { photoPreviewBoxClassName } from './photo-preview-box'

function EmptyState({
  error,
  onFileSelect,
}: {
  error?: string | null
  onFileSelect: (file: File) => void
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file: File | undefined) => {
    if (file) {
      void onFileSelect(file)
    }
  }

  return (
    <label
      htmlFor="setup-photo-input"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          document.getElementById('setup-photo-input')?.click()
        }
      }}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(event) => {
        event.preventDefault()
        setIsDragging(false)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        handleFile(event.dataTransfer.files.item(0) ?? undefined)
      }}
      className={cn(
        photoPreviewBoxClassName,
        'flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-4 text-center transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        error
          ? 'border-destructive/60 bg-destructive/5'
          : isDragging
            ? 'border-primary bg-accent/50'
            : 'border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40',
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
        <Icon name="upload" className="size-5 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {isDragging ? 'Drop your photo here' : 'Upload your setup photo'}
        </p>
        <p className="text-xs text-muted-foreground">
          Drag and drop, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          JPG, PNG or WEBP · max 10 MB
        </p>
      </div>

      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : null}

      <span className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Choose photo
      </span>
    </label>
  )
}

export default EmptyState
