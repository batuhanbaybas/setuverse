import { useNavigate } from '@tanstack/react-router'

import { signOut, useSession } from '#/features/auth/lib/auth-client'
import { isAdminRole } from '#/features/auth/lib/roles'
import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'
import Dropdown from '#/shared/components/ui/dropdown'
import type { DropdownItemProps } from '#/shared/components/ui/dropdown'

function AuthUserDropdown() {
  const navigate = useNavigate()
  const { data: session } = useSession()
  const isAdmin = isAdminRole(session?.user.role)

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  const items: DropdownItemProps[] = [
    {
      label: 'Profile',
      icon: 'user',
      onSelect: () => {
        void navigate({ to: '/profile' })
      },
    },
  ]

  if (isAdmin) {
    items.push({
      label: 'Admin',
      icon: 'shield',
      onSelect: () => {
        void navigate({ to: '/admin' })
      },
    })
  }

  items.push({
    label: 'Log out',
    icon: 'log-out',
    variant: 'destructive',
    onSelect: handleSignOut,
  })

  return (
    <Dropdown
      triggerProps={{
        children: (
          <Avatar className="size-10 ring-1 ring-ring/20">
            <AvatarImage src={session?.user.image ?? ''} />
            <AvatarFallback>
              {session?.user.name
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        ),
      }}
      items={items}
    />
  )
}

export default AuthUserDropdown
