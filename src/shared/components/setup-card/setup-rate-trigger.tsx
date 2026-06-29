import { useSession } from '#/features/auth/lib/auth-client'
import useGetCurrentUserRateStatus from '#/features/setup-rate/service/use-get-current-user-rate-status'
import { cn } from '#/shared/lib/utils'

import StarRating from './star-rating'

interface Props {
  setupId: string
  size?: 'default' | 'large'
  showLabel?: boolean
}

function SetupRateTrigger({
  setupId,
  size = 'default',
  showLabel = false,
}: Props) {
  const { data: session, isPending: isSessionPending } = useSession()
  const { data: rateStatus, isPending: isRateStatusPending } =
    useGetCurrentUserRateStatus(setupId)

  const userRate = rateStatus?.rate ?? null
  const hasUserRate = userRate != null && userRate > 0

  if (!setupId) {
    return null
  }

  if (isSessionPending) {
    return null
  }

  if (!session?.user) {
    return null
  }

  if (isRateStatusPending) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2 text-muted-foreground',
          size === 'large' ? 'h-10' : 'h-8',
          showLabel && size === 'large' && 'gap-2 px-4',
        )}
      >
        <StarRating
          value={null}
          size={size}
          interactive={false}
          setupId={setupId}
        />
        {showLabel ? (
          <span
            className={cn(
              'font-medium opacity-50',
              size === 'large' ? 'text-base' : 'text-sm',
            )}
          >
            Rate
          </span>
        ) : null}
      </span>
    )
  }

  const title = hasUserRate
    ? `Your rating: ${userRate}`
    : 'Rate this setup'

  return (
    <span
      title={title}
      aria-label={title}
      className={cn(
        'inline-flex items-center rounded-md text-muted-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-500',
        size === 'large' ? 'h-10 gap-2 px-3' : 'h-8 gap-1.5 px-2',
        showLabel && size === 'large' && 'px-4',
        hasUserRate && 'text-amber-500',
      )}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      <StarRating
        value={userRate}
        size={size}
        interactive
        setupId={setupId}
      />
      {showLabel ? (
        <span
          className={cn(
            'font-medium',
            size === 'large' ? 'text-base' : 'text-sm',
          )}
        >
          {hasUserRate ? 'Rated' : 'Rate'}
        </span>
      ) : null}
    </span>
  )
}

export default SetupRateTrigger
