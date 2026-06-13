import Dropdown from "../../ui/dropdown"
import { signOut, useSession } from "#/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"

function AuthUserDropdown() {
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
          label: "Logout",
          onSelect: handleSignOut,
        },
      ]}
    />
  )
}

export default AuthUserDropdown
