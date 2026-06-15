import { prismaAdapter } from 'better-auth/adapters/prisma'
import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { prisma } from '#/shared/lib/prisma'

export const auth = betterAuth({
  baseURL: process.env.BASE_URL!,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  account: {
    accountLinking: {
      enabled: true,
    }
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'USER',
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Google (veya baska bir provider) ile ilk girişte Better Auth user
        // kaydini olusturur; ad/e-posta/avatar zaten User üzerinde tutuldugu
        // icin profil sadece userId ile iliskilendirilerek acilir.
        after: async (user) => {
          await prisma.profile.create({ data: { userId: user.id } })
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [tanstackStartCookies()],
})
