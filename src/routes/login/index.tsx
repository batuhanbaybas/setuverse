import { createFileRoute, redirect } from '@tanstack/react-router'
import GoogleSignInButton from '#/components/auth/google-sign-in-button'
import { getSession } from '#/lib/auth.functions'
import LinkButton from '#/components/ui/button/link-button'
import Icon from '#/components/icons'

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

  return (
    <section className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <h1 className="text-3xl font-bold">Sign in to continue</h1>
      <p className="mt-3 text-muted-foreground">
        Create and share your own setups on Setuverse.
      </p>
      <GoogleSignInButton callbackURL={redirectTo} className="mt-8" />
      <LinkButton to="/" className="mt-4 gap-2 flex items-center" variant="outline">
        <Icon name="home" />
        Back to homepage
      </LinkButton>
    </section>
  )
}
