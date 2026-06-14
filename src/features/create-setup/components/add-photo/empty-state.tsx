import { useState } from 'react'
import Icon from '#/shared/components/icons'
import { buttonVariants } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

function EmptyState({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file: File | undefined) => {
    if (file?.type.startsWith('image/')) {
      onFileSelect(file)
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
        'flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        isDragging
          ? 'border-primary bg-accent/50'
          : 'border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40',
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-background shadow-sm">
        <Icon name="upload" className="size-6 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">
          {isDragging ? 'Drop your photo here' : 'Upload your setup photo'}
        </p>
        <p className="text-sm text-muted-foreground">
          Drag and drop an image here, or click to browse
        </p>
      </div>

      <span className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Choose photo
      </span>

      <p className="text-xs text-muted-foreground">
        PNG, JPG or WEBP recommended
      </p>
    </label>
  )
}

export default EmptyState
