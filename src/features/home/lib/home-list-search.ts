import { z } from 'zod'

const homePageSchema = z.coerce.number().int().min(1).catch(1).optional()

export const homeSearchSchema = z.object({
  category: z.string().optional(),
  page: homePageSchema,
})

export type HomeSearch = z.infer<typeof homeSearchSchema>

export function getHomeListPage(search: Pick<HomeSearch, 'page'>) {
  return search.page ?? 1
}
