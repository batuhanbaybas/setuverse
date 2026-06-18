import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'

import { CategoryStatusBadge } from './category-status-badge'
import { formatAdminDate } from '../lib/format-admin-date'
import { SetupStatusBadge } from './setup-status-badge'
import { UserRoleBadge } from './user-role-badge'
import AdminSetupPreviewCell from './admin-setup-preview-cell'
import type { AdminTableColumn } from './admin-data-table'
import type { AdminCategory } from '../server/get-admin-categories.functions'
import type { AdminSetup } from '../server/get-admin-setups.functions'
import type { AdminUser } from '../server/get-admin-users.functions'

export function getAdminUserColumns(): AdminTableColumn<AdminUser>[] {
  return [
    {
      id: 'name',
      header: 'Name',
      cellClassName: 'font-medium',
      render: (user) => user.name,
    },
    {
      id: 'email',
      header: 'Email',
      cellClassName: 'text-muted-foreground',
      render: (user) => user.email,
    },
    {
      id: 'role',
      header: 'Role',
      render: (user) => <UserRoleBadge role={user.role} />,
    },
    {
      id: 'verified',
      header: 'Verified',
      cellClassName: 'text-muted-foreground',
      render: (user) => (user.emailVerified ? 'Yes' : 'No'),
    },
    {
      id: 'joined',
      header: 'Joined',
      cellClassName: 'text-muted-foreground',
      render: (user) => formatAdminDate(user.createdAt),
    },
  ]
}

type GetAdminSetupColumnsOptions = {
  showStatus?: boolean
}

export function getAdminSetupColumns({
  showStatus = true,
}: GetAdminSetupColumnsOptions = {}): AdminTableColumn<AdminSetup>[] {
  const columns: AdminTableColumn<AdminSetup>[] = [
    {
      id: 'preview',
      header: '',
      cellClassName: 'w-24',
      render: (setup) => <AdminSetupPreviewCell setup={setup} />,
    },
    {
      id: 'title',
      header: 'Title',
      cellClassName: 'max-w-[240px] truncate font-medium',
      render: (setup) => setup.title ?? 'Untitled setup',
    },
  ]

  if (showStatus) {
    columns.push({
      id: 'status',
      header: 'Status',
      render: (setup) => <SetupStatusBadge status={setup.status} />,
    })
  }

  columns.push(
    {
      id: 'author',
      header: 'Author',
      render: (setup) => (
        <div className="flex flex-col">
          <span>{setup.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {setup.user.email}
          </span>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      render: (setup) =>
        setup.category?.name ?? (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      id: 'items',
      header: 'Items',
      cellClassName: 'text-muted-foreground',
      render: (setup) => setup.items.length.toLocaleString(),
    },
    {
      id: 'updated',
      header: 'Updated',
      cellClassName: 'text-muted-foreground',
      render: (setup) => formatAdminDate(setup.updatedAt),
    },
    {
      id: 'published',
      header: 'Published',
      cellClassName: 'text-muted-foreground',
      render: (setup) =>
        setup.publishedAt ? formatAdminDate(setup.publishedAt) : '—',
    },
  )

  return columns
}

export function getAdminCategoryColumns(): AdminTableColumn<AdminCategory>[] {
  return [
    {
      id: 'name',
      header: 'Name',
      cellClassName: 'font-medium',
      render: (category) => category.name,
    },
    {
      id: 'slug',
      header: 'Slug',
      cellClassName: 'text-muted-foreground',
      render: (category) => category.slug,
    },
    {
      id: 'icon',
      header: 'Icon',
      render: (category) =>
        category.icon ? (
          <div className="flex items-center gap-2">
            <Icon
              name={category.icon as IconName}
              className="size-4 text-muted-foreground"
            />
            <span className="text-muted-foreground">{category.icon}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      id: 'order',
      header: 'Order',
      cellClassName: 'text-muted-foreground',
      render: (category) => category.order,
    },
    {
      id: 'status',
      header: 'Status',
      render: (category) => (
        <CategoryStatusBadge isActive={category.isActive} />
      ),
    },
    {
      id: 'setups',
      header: 'Setups',
      cellClassName: 'text-muted-foreground',
      render: (category) => category.setupCount.toLocaleString(),
    },
    {
      id: 'created',
      header: 'Created',
      cellClassName: 'text-muted-foreground',
      render: (category) => formatAdminDate(category.createdAt),
    },
  ]
}
