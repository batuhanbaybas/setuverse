import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: 'Developer',
        slug: 'developer',
        icon: 'code',
        order: 1,
      },
      {
        name: 'Gaming',
        slug: 'gaming',
        icon: 'game-pad',
        order: 2,
      },
      {
        name: 'Minimal',
        slug: 'minimal',
        icon: 'leaf',
        order: 3,
      },
      {
        name: 'Mac Setup',
        slug: 'mac-setup',
        icon: 'apple',
        order: 4,
      },
    ],
    skipDuplicates: true,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
