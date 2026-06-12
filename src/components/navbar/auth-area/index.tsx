import LinkButton from "#/components/ui/button/link-button"
import { PlusIcon } from "lucide-react"
import AuthUserDropdown from "./auth-user-dropdown"

function AuthArea() {
  return (
    <nav className=" inline-flex items-center gap-6">
      <LinkButton to="/create">
        <PlusIcon className="size-4" />
        Create Setup
      </LinkButton>
      <AuthUserDropdown />
    </nav>
  )
}

export default AuthArea