import SetupImage from '#/shared/components/setup-card/setup-image'
import { Badge } from '#/shared/components/ui/badge'
import { formatFileSize } from '#/features/create-setup/lib/upload-utils'

import { formatAdminDate } from '../lib/format-admin-date'
import { ImageStatusBadge } from './image-status-badge'
import { SetupStatusBadge } from './setup-status-badge'
import type { AdminTableColumn } from './admin-data-table'
import type { AdminImage } from '../server/get-admin-images.functions'

export function getAdminImageColumns(): AdminTableColumn<AdminImage>[] {
  return [
    {
      id: 'preview',
      header: '',
      cellClassName: 'w-24',
      render: (image) => (
        <a
          href={image.url}
          target="_blank"
          rel="noreferrer"
          className="block aspect-[4/3] w-20 overflow-hidden rounded-md border bg-muted"
        >
          <SetupImage
            imageUrl={image.url}
            alt={image.setup?.title ?? 'Setup image'}
            className="size-full object-cover"
          />
        </a>
      ),
    },
    {
      id: 'setup',
      header: 'Setup',
      cellClassName: 'max-w-[240px]',
      render: (image) =>
        image.setup ? (
          <div className="space-y-1">
            <p className="truncate font-medium">
              {image.setup.title ?? 'Untitled setup'}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {image.setup.id}
            </p>
            {image.setup.status === 'DRAFT' ? (
              <Badge variant="secondary">Draft</Badge>
            ) : (
              <SetupStatusBadge status={image.setup.status} />
            )}
          </div>
        ) : (
          <ImageStatusBadge status="draft" />
        ),
    },
    {
      id: 'owner',
      header: 'Owner',
      render: (image) =>
        image.setup ? (
          <div className="flex flex-col">
            <span>{image.setup.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {image.setup.user.email}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">
            {image.ownerUserId ?? '—'}
          </span>
        ),
    },
    {
      id: 'size',
      header: 'Size',
      cellClassName: 'text-muted-foreground',
      render: (image) => formatFileSize(image.size),
    },
    {
      id: 'uploaded',
      header: 'Uploaded',
      cellClassName: 'text-muted-foreground',
      render: (image) => formatAdminDate(image.lastModified),
    },
  ]
}
