import Dropdown from '#/shared/components/ui/dropdown'
import { signOut, useSession } from '#/features/auth/lib/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'
import { useNavigate } from '@tanstack/react-router'

function AuthUserDropdown() {
  const navigate = useNavigate()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <Dropdown
      triggerProps={
        {children: <Avatar className="size-10 ring-1 ring-ring/20">
          <AvatarImage src={session?.user.image ?? ""} />
          <AvatarFallback>
            {session?.user.name
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        }}
      items={[
        {
          label: "Profile",
          onSelect: () => {
            void navigate({ to: '/profile' })
          },
        },
        {
          label: "Logout",
          onSelect: handleSignOut,
        },
      ]}
    />
  )
}

export default AuthUserDropdown
