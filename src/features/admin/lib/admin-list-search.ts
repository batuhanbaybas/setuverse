import { z } from 'zod'

const adminPageSchema = z.coerce.number().int().min(1).catch(1).optional()

export const adminUsersSearchSchema = z.object({
  page: adminPageSchema,
  userRole: z.enum(['admin', 'user']).optional(),
})

export const adminSetupsSearchSchema = z.object({
  page: adminPageSchema,
  setupStatus: z.enum(['pending', 'published', 'rejected']).optional(),
})

export const adminCategoriesSearchSchema = z.object({
  page: adminPageSchema,
  categoryStatus: z.enum(['active', 'inactive']).optional(),
})

export const adminImagesSearchSchema = z.object({
  page: adminPageSchema,
  imageStatus: z.enum(['referenced', 'draft']).optional(),
})

export type AdminUsersSearch = z.infer<typeof adminUsersSearchSchema>
export type AdminSetupsSearch = z.infer<typeof adminSetupsSearchSchema>
export type AdminCategoriesSearch = z.infer<typeof adminCategoriesSearchSchema>
export type AdminImagesSearch = z.infer<typeof adminImagesSearchSchema>

export function getAdminListPage(search: { page?: number }) {
  return search.page ?? 1
}

export function mapSetupStatusFilter(
  status?: AdminSetupsSearch['setupStatus'],
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
  role?: AdminUsersSearch['userRole'],
): 'ADMIN' | 'USER' | undefined {
  if (!role) return undefined

  return role === 'admin' ? 'ADMIN' : 'USER'
}

export function mapCategoryStatusFilter(
  status?: AdminCategoriesSearch['categoryStatus'],
): boolean | undefined {
  if (!status) return undefined

  return status === 'active'
}

export function mapImageStatusFilter(
  status?: AdminImagesSearch['imageStatus'],
): 'referenced' | 'draft' | undefined {
  return status
}
