import { prisma } from "#/shared/lib/prisma"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

const getSetupDetailValidator = z.object({
  setupId: z.string(),
})

export const getSetupDetail = createServerFn({ method: 'GET' })
  .validator(getSetupDetailValidator)
  .handler(async ({ data }) => {
    const setup = await prisma.setup.findUnique({
      where: { id: data.setupId },
    })
    return setup
  })