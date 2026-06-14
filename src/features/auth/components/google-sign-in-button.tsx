import { signIn } from '#/lib/auth-client'
import Icon from '#/components/icons'
import { Button } from '#/components/ui/button'

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
