import HomePage from '#/features/home/screen/home-page'
import { homeSearchSchema } from '#/features/home/lib/home-list-search'
import { getCategories } from '#/features/home/server/get-categories.functions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  validateSearch: homeSearchSchema,
  beforeLoad: async () => {
    const categories = await getCategories()
    return { categories }
  },
  component: Home,
})

function Home() {
  return <HomePage />
}
