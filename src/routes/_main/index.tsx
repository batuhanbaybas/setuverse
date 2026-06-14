import HomePage from '#/features/home/screen/home-page'
import getCategories from '#/features/home/server/get-categories'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'


const validateSearch = z.object({
  category: z.string().optional(),
})


export const Route = createFileRoute('/_main/')({ 
  validateSearch,
  beforeLoad: async () => {
    const categories = await getCategories()
    return { categories }
  },
  component: Home,
})

function Home() {
  const { categories } = Route.useRouteContext()

  return <HomePage categories={categories} />
}
