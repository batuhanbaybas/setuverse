import { UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import Dropdown from "../ui/dropdown"
import { signOut } from "better-auth/api"

function AuthUserDropdown() {


const handleSignOut = async () => {
  await signOut()
}


  return (
    <Dropdown
      triggerProps={{
        children: <Button variant="ghost" size="icon">
          <UserIcon className="w-4 h-4" />
        </Button>
      }}
      items={[
        {
          label: "Logout",
          onClick: handleSignOut,
        }
      ]}
    />
  )
}

export default AuthUserDropdown