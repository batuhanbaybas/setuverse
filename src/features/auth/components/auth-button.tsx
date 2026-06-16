import { LuLogIn } from 'react-icons/lu'

import LinkButton from '#/shared/components/ui/button/link-button'

function AuthButton() {
  return (
    <LinkButton to="/login">
      <LuLogIn className="size-4" aria-hidden />
      Sign in
    </LinkButton>
  )
}

export default AuthButton
