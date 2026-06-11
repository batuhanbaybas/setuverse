import { signIn } from "#/lib/auth-client"
import { Button } from "../ui/button"

function AuthButton() {
  const handleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }

  return <Button onClick={handleSignIn}>Sign in with Google</Button>
}

export default AuthButton
