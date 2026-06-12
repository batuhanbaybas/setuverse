import { useSession } from '#/lib/auth-client'
import AuthButton from './auth-button'
import AuthArea from './auth-area'
import BrandLogo from '../brand-logo'

function Navbar() {
  const { data: session } = useSession()
  return (
    <header className="sticky top-0 z-50 border-b h-20 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <BrandLogo />

        {session ? <AuthArea /> : <AuthButton />}
      </div>
    </header>
  )
}

export default Navbar
