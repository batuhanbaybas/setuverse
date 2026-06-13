import { signIn } from "#/lib/auth-client"
import Icon from "../icons"
import { Button } from "../ui/button"

function AuthButton() {
  const handleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }

  return <Button onClick={handleSignIn}>
    <Icon name="google" />
    Sign in with Google</Button>
}

export default AuthButton
