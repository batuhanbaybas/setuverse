import { useNavigate } from '@tanstack/react-router'

import { signOut, useSession } from '#/features/auth/lib/auth-client'
import Icon from '#/shared/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/shared/components/ui/dropdown/dropdown-menu'
import { cn } from '#/shared/lib/utils'

type AdminSidebarUserProps = {
  className?: string
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

function AdminSidebarUser({ className }: AdminSidebarUserProps) {
  const navigate = useNavigate()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  const name = session?.user.name ?? 'Admin'
  const email = session?.user.email ?? ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex w-full items-center gap-3 rounded-lg p-2 text-left outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <Avatar className="size-9 shrink-0 ring-1 ring-ring/20">
          <AvatarImage src={session?.user.image ?? ''} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          {email ? (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          ) : null}
        </div>

        <Icon
          name="ellipsis-vertical"
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-56">
        <DropdownMenuItem
          onSelect={() => {
            void navigate({ to: '/' })
          }}
        >
          <Icon name="home" aria-hidden />
          Back to site
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            void navigate({ to: '/profile' })
          }}
        >
          <Icon name="user" aria-hidden />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onSelect={handleSignOut}>
          <Icon name="log-out" aria-hidden />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AdminSidebarUser
