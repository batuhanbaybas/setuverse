import { getRouteApi } from '@tanstack/react-router'

import ProfileHeader from '../components/profile-header'
import ProfileSetupsTab from '../components/profile-setups-tab'
import useGetProfile from '../service/use-get-profile'

function ProfilePage() {
  const profileQuery = useGetProfile()

  if (profileQuery.isLoading) {
    return null
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <section className="py-8">
        <p className="text-sm text-destructive">
          {profileQuery.error?.message ?? 'Failed to load profile'}
        </p>
      </section>
    )
  }

  const profile = profileQuery.data

  return (
    <section className="py-8">
      <ProfileHeader profile={profile} />

      <div className="mt-8 space-y-4">
        <h2 className="text-sm font-medium">Setups</h2>
        <ProfileSetupsTab setups={profile.setups} />
      </div>
    </section>
  )
}

export default ProfilePage
