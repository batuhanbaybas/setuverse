import { Badge } from '#/shared/components/ui/badge'
import SetupImage from '#/features/setup/components/setup-image'

import useGetProfileSetups from '../service/use-get-profile-setups'
import ErrorState from '#/shared/components/error-state'
import EmptyState from '#/shared/components/empty-state'

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
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {setups.map((setup) => (
        <li
          key={setup.id}
          className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-sm"
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            {setup.imageUrl ? (
              <SetupImage
                imageUrl={setup.imageUrl}
                alt={setup.title ?? 'Setup image'}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="space-y-3 p-4">
            <div className="space-y-1">
              <h3 className="line-clamp-1 font-medium">
                {setup.title ?? 'Untitled setup'}
              </h3>
              {setup.description ? (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {setup.description}
                </p>
              ) : null}
            </div>

            {setup.category ? (
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{setup.category.name}</Badge>
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProfileSetupsTab
