/** Email domain used by demo/seed accounts created in `prisma/seed.ts`. */
export const SEED_EMAIL_DOMAIN = 'setuver.space'

export const seedUserEmailEndsWith = `@${SEED_EMAIL_DOMAIN}` as const

export const realUserEmailFilter = {
  not: { endsWith: seedUserEmailEndsWith },
} as const

export const seedUserEmailFilter = {
  endsWith: seedUserEmailEndsWith,
} as const
