import { LuCalendar } from 'react-icons/lu'

import LinkButton from '#/shared/components/ui/button/link-button'

import { formatMemberSince } from '../../lib/format-member-since'
import ProfileStats from '../profile-stats'
import useGetProfile from '../../service/use-get-profile'
import ErrorState from '#/shared/components/error-state'
import ProfilLinks from './profil-links'
import ProfilAvatar from './profil-avatar'
import Icon from '#/shared/components/icons'




function ProfileHeader() {
  const { data: profile, isError, error, isLoading } = useGetProfile()


if (isLoading) {
  return <div>Loading...</div>
}

if (isError) {
  return <ErrorState message={error.message} error={error} />
}

  return (
    <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <ProfilAvatar image={profile?.user.image || null} name={profile?.user.name || ''} />

        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{profile?.user.name}</h1>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {profile?.bio?.trim() ? profile.bio : 'No bio yet.'}
          </p>

   
          <ProfilLinks links={profile?.links ?? []} />

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Icon name="calendar" className="shrink-0" aria-hidden />
            <span>Joined {formatMemberSince(profile?.user.createdAt  ||  new Date())}</span>
          </div>

          <LinkButton to="/profile/edit" variant="outline" size="sm">
            <Icon name="pencil" aria-hidden />
            Edit profile
          </LinkButton>
        </div>
      </div>

      <ProfileStats/>
    </header>
  )
}

export default ProfileHeader
