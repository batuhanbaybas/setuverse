import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const SETUP_COUNT = 280
const EMAIL_DOMAIN = 'setuver.space'
const LEGACY_SEED_USER_IDS = ['seed_dummy_user_001']
const LEGACY_SEED_EMAILS = ['dummy.setups@setuverse.local']
const REMOVED_CATEGORY_SLUGS = ['apple-setup', 'desk-setup', 'plant-corner'] as const

const USERS = [
  {
    id: 'seed_user_elif_kaya',
    name: 'Elif Kaya',
    email: `elif.kaya@${EMAIL_DOMAIN}`,
    bio: 'Minimal desk setups and warm lighting.',
    gender: 'women',
    portraitId: 12,
  },
  {
    id: 'seed_user_can_demir',
    name: 'Can Demir',
    email: `can.demir@${EMAIL_DOMAIN}`,
    bio: 'Coding corners and dual-monitor layouts.',
    gender: 'men',
    portraitId: 22,
  },
  {
    id: 'seed_user_selin_arslan',
    name: 'Selin Arslan',
    email: `selin.arslan@${EMAIL_DOMAIN}`,
    bio: 'Cozy workspaces and calm vibes.',
    gender: 'women',
    portraitId: 33,
  },
  {
    id: 'seed_user_mert_yilmaz',
    name: 'Mert Yılmaz',
    email: `mert.yilmaz@${EMAIL_DOMAIN}`,
    bio: 'Gaming battlestations and RGB builds.',
    gender: 'men',
    portraitId: 41,
  },
  {
    id: 'seed_user_ayse_ozturk',
    name: 'Ayşe Öztürk',
    email: `ayse.ozturk@${EMAIL_DOMAIN}`,
    bio: 'Clean Mac desks and cable management.',
    gender: 'women',
    portraitId: 47,
  },
  {
    id: 'seed_user_emre_celik',
    name: 'Emre Çelik',
    email: `emre.celik@${EMAIL_DOMAIN}`,
    bio: 'Compact home-office setups.',
    gender: 'men',
    portraitId: 52,
  },
  {
    id: 'seed_user_zeynep_akin',
    name: 'Zeynep Akın',
    email: `zeynep.akin@${EMAIL_DOMAIN}`,
    bio: 'Cozy night desks and soft lamps.',
    gender: 'women',
    portraitId: 68,
  },
  {
    id: 'seed_user_burak_sahin',
    name: 'Burak Şahin',
    email: `burak.sahin@${EMAIL_DOMAIN}`,
    bio: 'Developer workspaces and standing desks.',
    gender: 'men',
    portraitId: 75,
  },
] as const

function avatarUrl(gender: 'women' | 'men', portraitId: number) {
  return `https://randomuser.me/api/portraits/${gender}/${portraitId}.jpg`
}

const TITLE_BY_CATEGORY: Record<string, { prefixes: string[]; suffixes: string[] }> = {
  gaming: {
    prefixes: ['RGB', 'Dark', 'Pro', 'Compact', 'Immersive', 'Neon', 'Dual', 'Ultra'],
    suffixes: ['Battlestation', 'Gaming Desk', 'PC Setup', 'Streamer Corner', 'Game Room'],
  },
  coding: {
    prefixes: ['Focused', 'Late-night', 'Clean', 'Dual-monitor', 'Deep-work', 'Terminal'],
    suffixes: ['Dev Desk', 'Coding Corner', 'Code Station', 'Dev Workspace', 'Editor Setup'],
  },
  developer: {
    prefixes: ['Focused', 'Modern', 'Clean', 'Dual-monitor', 'Standing', 'Remote'],
    suffixes: ['Dev Desk', 'Engineer Setup', 'Dev Workspace', 'Build Station', 'Code Nook'],
  },
  'mac-setup': {
    prefixes: ['Minimal', 'Clean', 'Silver', 'Studio', 'Bright', 'Sleek'],
    suffixes: ['Mac Desk', 'Apple Workspace', 'Mac Studio', 'MacBook Corner', 'iMac Setup'],
  },
  minimal: {
    prefixes: ['Minimal', 'Calm', 'Soft', 'Airy', 'Quiet', 'Simple'],
    suffixes: ['Workspace', 'Desk', 'Office', 'Corner', 'Studio'],
  },
}

/** Category-themed Unsplash photos — HTTP 200 verified. */
const IMAGES_BY_CATEGORY: Record<string, readonly string[]> = {
  gaming: [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1616587894289-86480e533129?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=1200&h=900&fit=crop',
  ],
  coding: [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=900&fit=crop',
  ],
  developer: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=900&fit=crop',
  ],
  'mac-setup': [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1593642634443-44adaa06623a?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=1200&h=900&fit=crop',
  ],
  minimal: [
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop',
  ],
}

const FALLBACK_IMAGES = IMAGES_BY_CATEGORY.minimal!

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length]!
}

function imagesForCategory(slug: string): readonly string[] {
  return IMAGES_BY_CATEGORY[slug] ?? FALLBACK_IMAGES
}

function titleForCategory(slug: string, index: number): string {
  const words = TITLE_BY_CATEGORY[slug] ?? TITLE_BY_CATEGORY.minimal!
  return `${pick(words.prefixes, index)} ${pick(words.suffixes, index + 3)}`
}

async function clearPreviousSeedData() {
  const seedEmails = [
    ...USERS.map((user) => user.email),
    ...LEGACY_SEED_EMAILS,
  ]

  const existingUsers = await prisma.user.findMany({
    where: {
      OR: [
        { email: { in: seedEmails } },
        { id: { in: [...USERS.map((user) => user.id), ...LEGACY_SEED_USER_IDS] } },
        { email: { endsWith: `@${EMAIL_DOMAIN}` } },
      ],
    },
    select: { id: true, email: true },
  })

  if (existingUsers.length === 0) {
    console.log('  no previous seed users to clear')
    return
  }

  const userIds = existingUsers.map((user) => user.id)

  await prisma.user.deleteMany({
    where: { id: { in: userIds } },
  })

  console.log(`  cleared ${existingUsers.length} previous seed users`)
}

async function removeObsoleteCategories() {
  const fallback = await prisma.category.findFirst({
    where: {
      slug: { notIn: [...REMOVED_CATEGORY_SLUGS] },
      isActive: true,
    },
    orderBy: { order: 'asc' },
  })

  for (const slug of REMOVED_CATEGORY_SLUGS) {
    const category = await prisma.category.findUnique({ where: { slug } })
    if (!category) continue

    const target =
      slug === 'apple-setup'
        ? await prisma.category.findFirst({
            where: {
              OR: [
                { slug: 'mac-setup' },
                { name: { equals: 'Mac Setup', mode: 'insensitive' } },
              ],
            },
          })
        : await prisma.category.findFirst({
            where: {
              OR: [{ slug: 'minimal' }, { slug: 'developer' }],
            },
          })

    const destination = target ?? fallback
    if (destination) {
      await prisma.setup.updateMany({
        where: { categoryId: category.id },
        data: { categoryId: destination.id },
      })
    }

    await prisma.category.delete({ where: { id: category.id } })
    console.log(`  removed category: ${slug}`)
  }
}

async function getExistingCategories() {
  return prisma.category.findMany({
    where: {
      isActive: true,
      slug: { notIn: [...REMOVED_CATEGORY_SLUGS, '/'] },
    },
    orderBy: { order: 'asc' },
  })
}

async function seedUsers() {
  const users = []

  for (const seedUser of USERS) {
    const user = await prisma.user.create({
      data: {
        id: seedUser.id,
        name: seedUser.name,
        email: seedUser.email,
        image: avatarUrl(seedUser.gender, seedUser.portraitId),
        emailVerified: true,
        profile: {
          create: {
            bio: seedUser.bio,
          },
        },
      },
    })
    users.push(user)
  }

  return users
}

async function refreshSeedUserAvatars() {
  let updated = 0

  for (const seedUser of USERS) {
    const result = await prisma.user.updateMany({
      where: {
        OR: [{ id: seedUser.id }, { email: seedUser.email }],
      },
      data: {
        name: seedUser.name,
        image: avatarUrl(seedUser.gender, seedUser.portraitId),
      },
    })
    updated += result.count
    console.log(`  ${seedUser.name} -> ${seedUser.gender}/${seedUser.portraitId}`)
  }

  return updated
}

async function seedSetups(
  userIds: string[],
  categories: Array<{ id: string; slug: string }>,
) {
  console.log(`Creating ${SETUP_COUNT} setups...`)

  const perCategoryIndex = new Map<string, number>()

  for (let i = 0; i < SETUP_COUNT; i++) {
    const category = pick(categories, i)
    const categoryIndex = perCategoryIndex.get(category.slug) ?? 0
    perCategoryIndex.set(category.slug, categoryIndex + 1)

    const title = titleForCategory(category.slug, categoryIndex)
    const imageUrl = pick(imagesForCategory(category.slug), categoryIndex)
    const publishedAt = new Date(Date.now() - (SETUP_COUNT - i) * 60 * 60 * 1000)

    await prisma.setup.create({
      data: {
        userId: pick(userIds, i),
        categoryId: category.id,
        title,
        description: `${title} tailored for the ${category.slug.replace('-', ' ')} vibe.`,
        imageUrl,
        imageWidth: 1200,
        imageHeight: 900,
        completedStep: 3,
        status: 'PUBLISHED',
        publishedAt,
      },
    })

    if ((i + 1) % 50 === 0 || i + 1 === SETUP_COUNT) {
      console.log(`  ${i + 1}/${SETUP_COUNT} setups created`)
    }
  }

  return SETUP_COUNT
}

/** Refresh images/titles on existing seed setups without wiping users. */
async function refreshSeedSetupMedia() {
  const seedUsers = await prisma.user.findMany({
    where: { email: { endsWith: `@${EMAIL_DOMAIN}` } },
    select: { id: true },
  })

  if (seedUsers.length === 0) {
    console.log('No seed users found to refresh.')
    return 0
  }

  const setups = await prisma.setup.findMany({
    where: { userId: { in: seedUsers.map((user) => user.id) } },
    select: {
      id: true,
      category: { select: { slug: true } },
    },
    orderBy: { publishedAt: 'asc' },
  })

  const perCategoryIndex = new Map<string, number>()
  let updated = 0

  for (const setup of setups) {
    const slug = setup.category?.slug ?? 'minimal'
    const categoryIndex = perCategoryIndex.get(slug) ?? 0
    perCategoryIndex.set(slug, categoryIndex + 1)

    const title = titleForCategory(slug, categoryIndex)
    const imageUrl = pick(imagesForCategory(slug), categoryIndex)

    await prisma.setup.update({
      where: { id: setup.id },
      data: {
        title,
        description: `${title} tailored for the ${slug.replace('-', ' ')} vibe.`,
        imageUrl,
      },
    })
    updated += 1
  }

  console.log(`Refreshed ${updated} setups across categories:`)
  for (const [slug, count] of perCategoryIndex.entries()) {
    console.log(`  ${slug}: ${count}`)
  }

  return updated
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to run the seed.')
  }

  const mode = process.argv[2] ?? 'seed'

  if (mode === 'refresh-images') {
    console.log('Refreshing seed setup images by category...')
    await refreshSeedSetupMedia()
    console.log('Done.')
    return
  }

  if (mode === 'refresh-avatars') {
    console.log('Refreshing seed user avatars by gender...')
    const updated = await refreshSeedUserAvatars()
    console.log(`Updated ${updated} users.`)
    return
  }

  if (mode === 'cleanup-categories') {
    console.log('Removing obsolete categories...')
    await removeObsoleteCategories()

    const remaining = await getExistingCategories()
    for (const [index, category] of remaining.entries()) {
      await prisma.category.update({
        where: { id: category.id },
        data: { order: index + 1 },
      })
      console.log(`  ${category.slug} -> order ${index + 1}`)
    }

    console.log('Refreshing seed setup images by category...')
    await refreshSeedSetupMedia()
    console.log('Done.')
    return
  }

  console.log('Clearing previous seed data...')
  await clearPreviousSeedData()

  console.log('Removing obsolete categories...')
  await removeObsoleteCategories()

  console.log('Loading existing categories...')
  const categories = await getExistingCategories()
  if (categories.length === 0) {
    throw new Error('No active categories found. Create categories before seeding setups.')
  }
  console.log(`  ${categories.length} categories ready`)

  console.log('Seeding users...')
  const users = await seedUsers()
  console.log(`  ${users.length} users ready`)

  console.log(`Seeding ${SETUP_COUNT} published setups...`)
  const setupCount = await seedSetups(
    users.map((user) => user.id),
    categories.map((category) => ({ id: category.id, slug: category.slug })),
  )

  console.log('Seed complete.')
  console.log(`  users: ${users.map((user) => user.email).join(', ')}`)
  console.log(`  setups: ${setupCount}`)
  console.log(`  categories: ${categories.length}`)
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
