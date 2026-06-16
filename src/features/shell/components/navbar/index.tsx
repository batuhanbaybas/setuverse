import { useSession } from '#/features/auth/lib/auth-client'
import AuthButton from '#/features/auth/components/auth-button'
import AuthArea from '#/features/auth/components/auth-area'
import BrandLogo from '#/features/shell/components/brand-logo'

function Navbar() {
  const { data: session } = useSession()
  return (
    <header className="sticky top-0 z-50 border-b h-20 flex items-center bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <BrandLogo />

        {session ? <AuthArea /> : <AuthButton />}
      </div>
    </header>
  )
}

export default Navbar
