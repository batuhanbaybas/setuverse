import GoogleSignInButton from '#/features/auth/components/google-sign-in-button'
import LinkButton from '#/shared/components/ui/button/link-button'
import Icon from '#/shared/components/icons'

type LoginPageProps = {
  redirectTo?: string
}

function LoginPage({ redirectTo }: LoginPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-12 text-center sm:py-16">
      <h1 className="text-2xl font-bold sm:text-3xl">Sign in to continue</h1>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        Create and share your own setups on Setuverse.
      </p>
      <GoogleSignInButton
        callbackURL={redirectTo}
        className="mt-8 w-full sm:w-auto"
      />
      <LinkButton
        to="/"
        className="mt-4 flex w-full items-center justify-center gap-2 sm:w-auto"
        variant="outline"
      >
        <Icon name="home" />
        Back to homepage
      </LinkButton>
    </section>
  )
}

export default LoginPage
