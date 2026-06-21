import useGetProfileLikedSetups from '../../service/use-get-profile-liked-setups'
import EmptyState from '#/shared/components/empty-state'
import ErrorState from '#/shared/components/error-state'
import SetupCard from '#/shared/components/setup-card'

function ProfileLikedTab() {
  const { data: setups, isError, error } = useGetProfileLikedSetups()

  if (isError) {
    return <ErrorState message="Failed to load liked setups" error={error} />
  }

  if (!setups || setups.length === 0) {
    return (
      <EmptyState
        title="No liked setups yet"
        description="Setups you like will appear here."
      />
    )
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {setups.map((setup) => (
        <SetupCard
          key={setup.id}
          setupId={setup.id}
          imageUrl={setup.imageUrl ?? ''}
          title={setup.title ?? ''}
          category={setup.category?.name ?? ''}
          publisherInfo={{
            name: setup.user.name,
            avatarUrl: setup.user.image ?? '',
          }}
        />
      ))}
    </section>
  )
}

export default ProfileLikedTab
