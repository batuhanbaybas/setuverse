import { useSession } from "#/lib/auth-client"
import { Link } from "@tanstack/react-router"
import AuthButton from "./auth-button"
import AuthUserDropdown from "./auth-user-dropdown"

function Navbar() {
    const { data: session } = useSession()
  return (
    <header className="sticky top-0 z-50 border-b flex justify-between items-center py-4">
        <h1>
            <Link to="/" className="text-2xl font-bold">Setuverse</Link>
        </h1>

    {session ? (
        <AuthUserDropdown />
    ) : (
        <AuthButton />
    )}
    </header>
  )
}

export default Navbar