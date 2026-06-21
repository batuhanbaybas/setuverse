import { prisma } from "#/shared/lib/prisma"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"


const setupDetailSchema = z.object({
  id: z.string(),
})


const getSetupDetail = createServerFn({
  method: 'GET',
}).validator(setupDetailSchema).handler(async ({ data}) => {
  const { id } = data
  const setup = await prisma.setup.findUnique({
    where: { id },
  })
  return setup
})


export default getSetupDetail