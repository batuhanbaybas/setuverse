
import useGetProfileSetups from '../../service/use-get-profile-setups'
import ErrorState from '#/shared/components/error-state'
import EmptyState from '#/shared/components/empty-state'
import SetupCard from '#/shared/components/setup-card'

function ProfileSetupsTab() {
  const { data: setups, isError, error } = useGetProfileSetups()

  if (isError) {
    return <ErrorState message="Failed to load setups" error={error} />
  }

  if (!setups || setups.length === 0) {
    return (
      <EmptyState
        title="No published setups yet"
        description="Published setups will appear here."
      />
    )
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {setups.map((setup) => (
        <SetupCard key={setup.id} imageUrl={setup.imageUrl ?? ''} title={setup.title ?? ''} category={setup.category?.name ?? ''} isProfilePage />
      ))}
    </section>
  )
}

export default ProfileSetupsTab
