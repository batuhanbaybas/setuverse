import { LuCalendar, LuExternalLink, LuPencil } from 'react-icons/lu'

import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'
import { Badge } from '#/shared/components/ui/badge'
import LinkButton from '#/shared/components/ui/button/link-button'

import { formatMemberSince } from '../lib/format-member-since'
import type { GetProfileResult } from '../server/get-profile.functions'
import ProfileStats from './profile-stats'

type ProfileHeaderProps = {
  profile: GetProfileResult
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

function getRoleBadge(role: GetProfileResult['user']['role']) {
  if (role === 'ADMIN') {
    return <Badge variant="secondary">Admin</Badge>
  }

  if (role === 'MODERATOR') {
    return <Badge variant="secondary">Moderator</Badge>
  }

  return null
}

function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { user, bio, links, publishedSetupsCount } = profile

  return (
    <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar className="size-24 ring-2 ring-border">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{user.name}</h1>
            {getRoleBadge(user.role)}
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {bio?.trim() ? bio : 'No bio yet.'}
          </p>

          {links.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <span>{link.label}</span>
                    <LuExternalLink
                      className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <LuCalendar className="size-4 shrink-0" aria-hidden />
            <span>Joined {formatMemberSince(user.createdAt)}</span>
          </div>

          <LinkButton to="/profile/edit" variant="outline" size="sm">
            <LuPencil className="size-4" aria-hidden />
            Edit profile
          </LinkButton>
        </div>
      </div>

      <ProfileStats publishedSetupsCount={publishedSetupsCount} />
    </header>
  )
}

export default ProfileHeader
