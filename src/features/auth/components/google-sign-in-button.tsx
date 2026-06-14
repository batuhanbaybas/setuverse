import { signIn } from '#/features/auth/lib/auth-client'
import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'

type GoogleSignInButtonProps = {
  callbackURL?: string
  className?: string
}

function GoogleSignInButton({
  callbackURL = '/',
  className,
}: GoogleSignInButtonProps) {
 
  const handleSignIn = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: callbackURL,
    })
  }

  return (
    <Button onClick={handleSignIn} className={className}>
      <Icon name="google" />
      Sign in with Google
    </Button>
  )
}

export default GoogleSignInButton
