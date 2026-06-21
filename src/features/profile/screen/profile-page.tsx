import ProfileHeader from '../components/profil-header'
import ProfileLikedTab from '../components/profil-liked-tab'
import ProfileSavedTab from '../components/profil-saved-tab'
import ProfileSetupsTab from '../components/profil-setup-tab'
import Tabs from '#/shared/components/ui/tabs'

function ProfilePage() {
  return (
    <section className="py-6 sm:py-8">
      <ProfileHeader />

      <div className="mt-8 space-y-6">
        <Tabs
          defaultValue="my-setups"
          tablist={{
            className: 'flex-1 text-center',
          }}
          items={[
            {
              trigger: {
                value: 'my-setups',
                children: 'My Setups',
                className: 'flex-1 text-center',
              },
              content: {
                value: 'my-setups',
                children: <ProfileSetupsTab />,
              },
            },
            {
              trigger: {
                value: 'liked',
                children: 'Liked',
                className: 'flex-1 text-center',
              },
              content: {
                value: 'liked',
                children: <ProfileLikedTab />,
              },
            },
            {
              trigger: {
                value: 'saved',
                children: 'Saved',
                className: 'flex-1 text-center',
              },
              content: {
                value: 'saved',
                children: <ProfileSavedTab />,
              },
            },
          ]}
        />
      </div>
    </section>
  )
}

export default ProfilePage
