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
        name: 'All',
        slug: '/',
        icon: 'layout-grid',
        order: 1,
      },
      {
        name: 'Developer',
        slug: 'developer',
        icon: 'code',
        order: 2,
      },
      {
        name: 'Gaming',
        slug: 'gaming',
        icon: 'game-pad',
        order: 3,
      },
      {
        name: 'Minimal',
        slug: 'minimal',
        icon: 'leaf',
        order: 4,
      },
      {
        name: 'Mac Setup',
        slug: 'mac-setup',
        icon: 'apple',
        order: 5,
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
