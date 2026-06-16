import { createAuthClient } from 'better-auth/react'

export const { useSession, signIn, signOut, signUp, getSession } =
  createAuthClient({
    baseURL: import.meta.env.VITE_BASE_URL,
    redirectTo: '/',
  })