import type { UploadFile } from 'react-upload-kit'
import { useEffect, useState } from 'react'

import Icon from '#/shared/components/icons'
import { Badge } from '#/shared/components/ui/badge'
import { Button } from '#/shared/components/ui/button'

import type { SetupImageUploadResponse } from '../../lib/setup-image-upload-adapter'
import { formatFileSize, getUploadStatusMeta } from '../../lib/upload-utils'

type UploadPreviewProps = {
  file: UploadFile<SetupImageUploadResponse>
  isRemoving?: boolean
  removeError?: string | null
  onRemove: () => void
  onRetry: () => void
  onCancel: () => void
}

function UploadPreview({
  file,
  isRemoving = false,
  removeError = null,
  onRemove,
  onRetry,
  onCancel,
}: UploadPreviewProps) {
  const status = getUploadStatusMeta(file.status)
  const [localPreview, setLocalPreview] = useState<string | null>(null)
  const uploadedUrl =
    file.status === 'success' ? file.response?.url ?? null : null

  useEffect(() => {
    const previewUrl = URL.createObjectURL(file.file)
    setLocalPreview(previewUrl)

    return () => {
      URL.revokeObjectURL(previewUrl)
    }
  }, [file.id, file.file])

  // Prefer local blob preview — R2 public URL may not be readable yet (401).
  const imageSrc = localPreview ?? uploadedUrl

  return (
    <div className="overflow-hidden rounded-xl border bg-muted/20">
      <div className="relative flex min-h-72 items-center justify-center bg-muted/40 p-6">
        {imageSrc ? (
          <img
            key={imageSrc}
            src={imageSrc}
            alt={file.file.name}
            className="max-h-80 w-full rounded-lg object-contain shadow-sm"
          />
        ) : (
          <div className="flex size-40 items-center justify-center rounded-lg border bg-background text-sm text-muted-foreground">
            Preview unavailable
          </div>
        )}

        {file.status !== 'uploading' ? (
          <Button
            type="button"
            size="icon-sm"
            variant="secondary"
            className="absolute top-4 right-4 shadow-sm"
            aria-label="Remove image"
            disabled={isRemoving}
            onClick={onRemove}
          >
            {isRemoving ? (
              <Icon name="loader" className="size-4 animate-spin" />
            ) : (
              <Icon name="x" className="size-4" />
            )}
          </Button>
        ) : null}

        {file.status === 'uploading' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2 rounded-xl border bg-background px-5 py-4 shadow-sm">
              <Icon name="loader" className="size-5 animate-spin text-primary" />
              <p className="text-sm font-medium">Uploading image…</p>
              <p className="text-xs text-muted-foreground">{file.progress}%</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="space-y-4 border-t bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="truncate text-sm font-medium">{file.file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.file.size)}
            </p>
          </div>

          <Badge variant={status.variant} className="shrink-0">
            {file.status === 'success' ? (
              <Icon name="check" className="size-3" />
            ) : null}
            {status.label}
          </Badge>
        </div>

        {file.status === 'uploading' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{file.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              />
            </div>
          </div>
        ) : null}

        {file.error || removeError ? (
          <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {file.error?.message ?? removeError}
          </p>
        ) : null}

        {file.status === 'success' ? (
          <p className="text-sm text-muted-foreground">
            Your setup image looks good. Continue to add details in the next step.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {file.status === 'uploading' ? (
            <Button type="button" size="sm" variant="outline" onClick={onCancel}>
              Cancel upload
            </Button>
          ) : null}
          {file.status === 'error' ? (
            <Button type="button" size="sm" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
          {file.status !== 'uploading' ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isRemoving}
              onClick={onRemove}
            >
              {isRemoving ? (
                <Icon name="loader" className="size-4 animate-spin" />
              ) : (
                <Icon name="x" />
              )}
              {file.status === 'success' ? 'Remove image' : 'Remove'}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UploadPreview
