import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema',
  migrations: {
    path: './prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // `prisma generate` loads config but never connects; real URL comes from .env at runtime.
    url: process.env.DATABASE_URL,
  },
})
