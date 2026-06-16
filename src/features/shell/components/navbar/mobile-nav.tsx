import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  LuChevronRight,
  LuLogOut,
  LuMenu,
  LuPlus,
  LuUser,
} from 'react-icons/lu'

import { signOut, useSession } from '#/features/auth/lib/auth-client'
import Icon from '#/shared/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'
import { Button } from '#/shared/components/ui/button'
import LinkButton from '#/shared/components/ui/button/link-button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '#/shared/components/ui/sheet'
import { cn } from '#/shared/lib/utils'

type MobileNavProps = {
  isAuthenticated: boolean
}

type MobileNavItemProps = {
  to: string
  icon: ReactNode
  label: string
  description?: string
  onClick: () => void
  variant?: 'default' | 'primary'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function MobileNavItem({
  to,
  icon,
  label,
  description,
  onClick,
  variant = 'default',
}: MobileNavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'hover:bg-accent hover:text-accent-foreground',
      )}
    >
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-lg',
          variant === 'primary'
            ? 'bg-primary-foreground/15'
            : 'bg-muted text-foreground',
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {description ? (
          <span
            className={cn(
              'block truncate text-xs',
              variant === 'primary'
                ? 'text-primary-foreground/80'
                : 'text-muted-foreground',
            )}
          >
            {description}
          </span>
        ) : null}
      </span>
      <LuChevronRight
        className={cn(
          'size-4 shrink-0',
          variant === 'primary'
            ? 'text-primary-foreground/70'
            : 'text-muted-foreground',
        )}
        aria-hidden
      />
    </Link>
  )
}

function MobileNavUserSection({
  name,
  email,
  image,
}: {
  name: string
  email: string
  image: string | null | undefined
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border bg-muted/30 px-4 py-4 text-center">
      <Avatar className="size-20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
        <AvatarImage
          src={image ?? undefined}
          alt={name}
          referrerPolicy="no-referrer"
        />
        <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
          {getInitials(name) || '?'}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 space-y-0.5">
        <p className="truncate text-base font-semibold">{name}</p>
        {email ? (
          <p className="truncate text-sm text-muted-foreground">{email}</p>
        ) : null}
      </div>
    </div>
  )
}

function MobileNav({ isAuthenticated }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const close = () => setOpen(false)

  const handleSignOut = async () => {
    close()
    await signOut()
    window.location.href = '/'
  }

  const userName = session?.user?.name ?? 'Your account'
  const userEmail = session?.user?.email ?? ''
  const userImage = session?.user?.image

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="md:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <LuMenu className="size-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex h-full min-h-0 flex-col gap-0 p-0">
          <div className="shrink-0 px-5 pb-4 pr-12 pt-[max(3.5rem,calc(env(safe-area-inset-top)+2.5rem))]">
            {isAuthenticated ? (
              <MobileNavUserSection
                name={userName}
                email={userEmail}
                image={userImage}
              />
            ) : (
              <SheetHeader className="pt-[max(0.5rem,env(safe-area-inset-top))]">
                <div className="flex items-center gap-2">
                  <Icon name="palanet" className="size-7 text-primary" />
                  <SheetTitle>Setuverse</SheetTitle>
                </div>
                <SheetDescription>
                  Discover and share desk setups.
                </SheetDescription>
              </SheetHeader>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <nav
              className="flex-1 space-y-1 overflow-y-auto px-3 py-2"
              aria-label="Mobile navigation"
            >
              <p className="px-3 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Navigation
              </p>

              {isAuthenticated ? (
                <>
                  <MobileNavItem
                    to="/create"
                    icon={<LuPlus className="size-4" aria-hidden />}
                    label="Create Setup"
                    description="Start a new setup"
                    onClick={close}
                    variant="primary"
                  />
                  <MobileNavItem
                    to="/profile"
                    icon={<LuUser className="size-4" aria-hidden />}
                    label="Profile"
                    description="Your setups and links"
                    onClick={close}
                  />
                </>
              ) : (
                <div className="px-1">
                  <LinkButton
                    to="/login"
                    className="h-11 w-full justify-center"
                    onClick={close}
                  >
                    Sign in with Google
                  </LinkButton>
                </div>
              )}
            </nav>

            {isAuthenticated ? (
              <div className="shrink-0 border-t bg-background px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full justify-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => void handleSignOut()}
                >
                  <LuLogOut className="size-4" aria-hidden />
                  Log out
                </Button>
              </div>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileNav
