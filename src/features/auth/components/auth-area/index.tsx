import Icon from '#/shared/components/icons'
import LinkButton from '#/shared/components/ui/button/link-button'
import AuthUserDropdown from './auth-user-dropdown'

function AuthArea() {
  return (
    <nav className=" inline-flex items-center gap-6">
      <LinkButton to="/create">
        <Icon name="plus" />
        Create Setup
      </LinkButton>
      <AuthUserDropdown />
    </nav>
  )
}

export default AuthArea