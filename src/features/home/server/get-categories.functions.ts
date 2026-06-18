import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'

export const getCategories = createServerFn({
  method: 'GET',
}).handler(async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      order: 'asc',
    },
  })

  return categories
})
