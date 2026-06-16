import { Link } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'

import { cn } from '#/shared/lib/utils'

const profileRouteApi = getRouteApi('/_main/profile/')

export type ProfileTab = 'my-setups' | 'liked' | 'saved'

type ProfileTabItem = {
  id: ProfileTab
  label: string
}

const profileTabs: ProfileTabItem[] = [
  { id: 'my-setups', label: 'My Setups' },
  { id: 'liked', label: 'Liked' },
  { id: 'saved', label: 'Saved' },
]

function ProfileTabs() {
  const { tab = 'my-setups' } = profileRouteApi.useSearch()

  return (
    <nav className="flex gap-6 border-b" aria-label="Profile sections">
      {profileTabs.map((item) => {
        const isActive = tab === item.id

        return (
          <Link
            key={item.id}
            to="/profile"
            search={{ tab: item.id }}
            className={cn(
              '-mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
              isActive
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default ProfileTabs
