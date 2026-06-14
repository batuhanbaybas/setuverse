import GoogleSignInButton from '#/features/auth/components/google-sign-in-button'
import LinkButton from '#/shared/components/ui/button/link-button'
import Icon from '#/shared/components/icons'

type LoginPageProps = {
  redirectTo?: string
}

function LoginPage({ redirectTo }: LoginPageProps) {
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

export default LoginPage
