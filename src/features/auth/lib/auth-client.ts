import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'

export const { useSession, signIn, signOut, signUp, getSession } =
  createAuthClient({
    baseURL: import.meta.env.VITE_BASE_URL,
    redirectTo: '/',
    plugins: [
      inferAdditionalFields({
        user: {
          role: {
            type: 'string',
          },
        },
      }),
    ],
  })