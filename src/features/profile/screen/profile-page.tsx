import { getRouteApi } from '@tanstack/react-router'

import ProfileEmptyTab from '../components/profile-empty-tab'
import ProfileHeader from '../components/profil-header'
import ProfileSetupsTab from '../components/profile-setups-tab'
import ProfileTabs from '../components/profile-tabs'

const profileRouteApi = getRouteApi('/_main/profile/')

function ProfilePage() {
  const { tab = 'my-setups' } = profileRouteApi.useSearch()

  return (
    <section className="py-6 sm:py-8">
      <ProfileHeader  />

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
          <ProfileSetupsTab  />
        )}
      </div>
    </section>
  )
}

export default ProfilePage
