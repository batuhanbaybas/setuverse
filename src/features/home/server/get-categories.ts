import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'

const getCategories = createServerFn({
  method: 'GET',
}).handler(async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return categories
})

export default getCategories
