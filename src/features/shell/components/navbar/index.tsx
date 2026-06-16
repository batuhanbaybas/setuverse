import { useSession } from '#/features/auth/lib/auth-client'
import AuthButton from '#/features/auth/components/auth-button'
import AuthArea from '#/features/auth/components/auth-area'
import BrandLogo from '#/features/shell/components/brand-logo'
import { pageContainerClass } from '#/shared/lib/layout'

import MobileNav from './mobile-nav'

function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background sm:h-20">
      <div
        className={`${pageContainerClass} flex w-full items-center justify-between gap-3`}
      >
        <BrandLogo />

        <div className="hidden md:block">
          {session ? <AuthArea /> : <AuthButton />}
        </div>

        <MobileNav isAuthenticated={Boolean(session)} />
      </div>
    </header>
  )
}

export default Navbar
