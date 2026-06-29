import { LuLogIn } from 'react-icons/lu'

import Icon from '#/shared/components/icons'
import LinkButton from '#/shared/components/ui/button/link-button'

function AuthButton() {
  return (
    <nav className="inline-flex items-center gap-3">
      <LinkButton to="/setups" variant="ghost" size="sm" className="md:h-10 md:px-4">
        <Icon name="layout-grid" />
        Browse
      </LinkButton>
      <LinkButton to="/login" size="sm" className="md:h-10 md:px-4">
        <LuLogIn className="size-4" aria-hidden />
        Sign in
      </LinkButton>
    </nav>
  )
}

export default AuthButton
