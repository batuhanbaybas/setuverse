import { createAuthClient } from 'better-auth/react'

export const { useSession, signIn, signOut, signUp, getSession } =
  createAuthClient({
    baseURL: process.env.BASE_URL!,
    redirectTo: "/",
  });