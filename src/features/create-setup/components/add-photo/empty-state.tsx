import { useState } from 'react'
import Icon from '#/shared/components/icons'
import { buttonVariants } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'
import { photoEmptyStateClassName } from './photo-preview-box'

function EmptyState({
  isValidating,
  onFileSelect,
}: {
  isValidating?: boolean
  onFileSelect: (file: File) => void
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file: File | undefined) => {
    if (file && !isValidating) {
      void onFileSelect(file)
    }
  }

  return (
    <label
      htmlFor="setup-photo-input"
      tabIndex={0}
      aria-busy={isValidating}
      onKeyDown={(event) => {
        if (isValidating) {
          return
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          document.getElementById('setup-photo-input')?.click()
        }
      }}
      onDragOver={(event) => {
        if (isValidating) {
          return
        }

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
        photoEmptyStateClassName,
        'relative flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-4 text-center transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        isDragging
          ? 'border-primary bg-accent/50'
          : 'border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40',
        isValidating && 'pointer-events-none cursor-wait opacity-80',
      )}
    >
      {isValidating ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/70 backdrop-blur-[1px]">
          <div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-foreground">Checking image...</p>
        </div>
      ) : null}

      <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
        <Icon name="upload" className="size-5 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {isDragging ? 'Drop your photo here' : 'Upload your setup photos'}
        </p>
        <p className="text-xs text-muted-foreground">
          Drag and drop, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          JPG, PNG or WEBP · up to 10 MB each
        </p>
      </div>

      <span className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Choose photo
      </span>
    </label>
  )
}

export default EmptyState
