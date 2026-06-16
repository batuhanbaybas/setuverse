import { LuLogOut, LuUser } from 'react-icons/lu'
import { useNavigate } from '@tanstack/react-router'

import { signOut, useSession } from '#/features/auth/lib/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'
import Dropdown from '#/shared/components/ui/dropdown'

function AuthUserDropdown() {
  const navigate = useNavigate()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

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
      items={[
        {
          label: 'Profile',
          icon: <LuUser className="size-4" aria-hidden />,
          onSelect: () => {
            void navigate({ to: '/profile' })
          },
        },
        {
          label: 'Log out',
          icon: <LuLogOut className="size-4" aria-hidden />,
          variant: 'destructive',
          onSelect: handleSignOut,
        },
      ]}
    />
  )
}

export default AuthUserDropdown
