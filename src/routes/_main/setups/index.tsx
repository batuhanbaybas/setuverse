import SetupsPage from '#/features/home/screen/setups-page'
import { homeSearchSchema } from '#/features/home/lib/home-list-search'
import { getCategories } from '#/features/home/server/get-categories.functions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/setups/')({
  validateSearch: homeSearchSchema,
  beforeLoad: async () => {
    const categories = await getCategories()
    return { categories }
  },
  component: Setups,
})

function Setups() {
  return <SetupsPage />
}
