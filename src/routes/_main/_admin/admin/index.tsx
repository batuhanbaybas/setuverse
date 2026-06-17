import AdminPage from '#/features/admin/screen/admin-page'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const validateSearch = z.object({
  view: z.enum(['users', 'setups', 'categories']).optional(),
})

export const Route = createFileRoute('/_main/_admin/admin/')({
  validateSearch,
  component: AdminPage,
})
