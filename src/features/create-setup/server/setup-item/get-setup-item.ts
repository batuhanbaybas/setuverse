import { prisma } from "#/shared/lib/prisma"
import { createServerFn } from "@tanstack/react-start"
import z from "zod"


const getSetupItemSchema = z.object({
  setupId: z.string(),
})


const getSetupItem = createServerFn({
  method: 'GET',
}).validator(getSetupItemSchema).handler(async ({ data }) => {
  const { setupId } = data
  const items = await prisma.setupItem.findMany({
    where: { setupId },
    orderBy: { createdAt: 'asc' },
  })
  return items
})

export default getSetupItem