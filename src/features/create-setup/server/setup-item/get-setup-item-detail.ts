import { prisma } from '#/shared/lib/prisma'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

const getSetupItemDetailSchema = z.object({
  id: z.string(),
})

const getSetupItemDetail = createServerFn({
  method: 'GET',
})
  .validator(getSetupItemDetailSchema)
  .handler(async ({ data }) => {
    const { id } = data
    const item = await prisma.setupItem.findUnique({
      where: { id },
    })
    return item
  })

export default getSetupItemDetail
