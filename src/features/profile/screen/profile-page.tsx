import { getRouteApi } from '@tanstack/react-router'

import ProfileEmptyTab from '../components/profile-empty-tab'
import ProfileHeader from '../components/profile-header'
import ProfileSetupsTab from '../components/profile-setups-tab'
import ProfileTabs from '../components/profile-tabs'
import useGetProfile from '../service/use-get-profile'

const profileRouteApi = getRouteApi('/_main/profile/')

function ProfilePage() {
  const { tab = 'my-setups' } = profileRouteApi.useSearch()
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

      <div className="mt-8 space-y-6">
        <ProfileTabs />

        {tab === 'liked' ? (
          <ProfileEmptyTab
            title="No liked setups yet"
            description="Setups you like will appear here."
          />
        ) : tab === 'saved' ? (
          <ProfileEmptyTab
            title="No saved setups yet"
            description="Setups you save will appear here."
          />
        ) : (
          <ProfileSetupsTab setups={profile.setups} />
        )}
      </div>
    </section>
  )
}

export default ProfilePage
