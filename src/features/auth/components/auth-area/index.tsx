import Icon from '#/shared/components/icons'
import LinkButton from '#/shared/components/ui/button/link-button'

import AuthUserDropdown from './auth-user-dropdown'

function AuthArea() {
  return (
    <nav className="inline-flex items-center gap-4 lg:gap-6">
      <LinkButton to="/setups" variant="ghost" size="sm" className="md:h-10 md:px-4">
        <Icon name="layout-grid" />
        <span className="hidden sm:inline">Browse</span>
      </LinkButton>
      <LinkButton to="/create" size="sm" className="md:h-10 md:px-4">
        <Icon name="plus" />
        <span className="hidden sm:inline">Upload Setup</span>
        <span className="sm:hidden">Upload</span>
      </LinkButton>
      <AuthUserDropdown />
    </nav>
  )
}

export default AuthArea
