import { useSession } from '#/features/auth/lib/auth-client'
import AuthButton from '#/features/auth/components/auth-button'
import AuthArea from '#/features/auth/components/auth-area'
import BrandLogo from '#/features/shell/components/brand-logo'
import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { pageContainerClass } from '#/shared/lib/layout'

import MobileNav from './mobile-nav'

const GITHUB_REPO_URL = 'https://github.com/batuhanbaybas/setuverse'

function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background sm:h-20">
      <div
        className={`${pageContainerClass} flex w-full items-center justify-between gap-3`}
      >
        <BrandLogo />

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="size-9" asChild>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Setuverse on GitHub"
            >
              <Icon name="github" className="size-5" />
            </a>
          </Button>

          <div className="hidden md:block">
            {session ? <AuthArea /> : <AuthButton />}
          </div>

          <MobileNav isAuthenticated={Boolean(session)} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
