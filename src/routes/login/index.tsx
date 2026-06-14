import LoginPage from '#/features/auth/components/login-page'
import { getSession } from '#/features/auth/lib/auth.functions'
import { createFileRoute, redirect } from '@tanstack/react-router'

type LoginSearch = {
  redirect?: string
}

export const Route = createFileRoute('/login/')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: async ({ search }) => {
    const session = await getSession()

    if (session) {
      throw redirect({ to: search.redirect ?? '/' })
    }
  },
  component: Login,
})

function Login() {
  const { redirect: redirectTo } = Route.useSearch()

  return <LoginPage redirectTo={redirectTo} />
}
