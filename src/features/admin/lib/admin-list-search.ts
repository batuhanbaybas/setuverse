import { z } from 'zod'

export const adminListSearchSchema = z.object({
  view: z.enum(['users', 'setups', 'categories']).optional(),
  page: z.coerce.number().int().min(1).catch(1).optional(),
  setupStatus: z.enum(['pending', 'published', 'rejected']).optional(),
  userRole: z.enum(['admin', 'user']).optional(),
  categoryStatus: z.enum(['active', 'inactive']).optional(),
})

export type AdminListSearch = z.infer<typeof adminListSearchSchema>

export function getAdminListPage(search: AdminListSearch) {
  return search.page ?? 1
}

export function mapSetupStatusFilter(
  status?: AdminListSearch['setupStatus'],
): 'PENDING' | 'PUBLISHED' | 'REJECTED' | undefined {
  if (!status) return undefined

  const map = {
    pending: 'PENDING',
    published: 'PUBLISHED',
    rejected: 'REJECTED',
  } as const

  return map[status]
}

export function mapUserRoleFilter(
  role?: AdminListSearch['userRole'],
): 'ADMIN' | 'USER' | undefined {
  if (!role) return undefined

  return role === 'admin' ? 'ADMIN' : 'USER'
}

export function mapCategoryStatusFilter(
  status?: AdminListSearch['categoryStatus'],
): boolean | undefined {
  if (!status) return undefined

  return status === 'active'
}
