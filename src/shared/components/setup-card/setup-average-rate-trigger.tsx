import useGetCurrentUserRateStatus from '#/features/setup-rate/service/use-get-current-user-rate-status'
import { formatAverageRate } from '#/shared/lib/format-average-rate'
import { cn } from '#/shared/lib/utils'

import Icon from '../icons'
import { Button } from '../ui/button'

interface Props {
  setupId: string
  size?: 'default' | 'large'
  showLabel?: boolean
}

function SetupAverageRateTrigger({
  setupId,
  size = 'default',
  showLabel = false,
}: Props) {
  const { data: rateStatus, isPending } = useGetCurrentUserRateStatus(setupId)

  const averageRate = rateStatus?.averageRate ?? null
  const ratingsCount = rateStatus?.ratingsCount ?? 0
  const hasAverage = averageRate != null && averageRate > 0
  const iconSize = size === 'large' ? 'size-5' : 'size-4'

  if (!setupId) {
    return null
  }

  if (isPending) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2 text-muted-foreground',
          size === 'large' ? 'h-10' : 'h-8',
          showLabel && size === 'large' && 'gap-2 px-4',
        )}
      >
        <Icon name="star" className={cn('opacity-50', iconSize)} />
        {showLabel ? (
          <span
            className={cn(
              'font-medium opacity-50',
              size === 'large' ? 'text-base' : 'text-sm',
            )}
          >
            Rating
          </span>
        ) : null}
        <span
          className={cn(
            'min-w-[2ch] font-medium tabular-nums opacity-50',
            size === 'large' ? 'text-base' : 'text-sm',
          )}
        >
          -
        </span>
      </span>
    )
  }

  const title = hasAverage
    ? ratingsCount > 0
      ? `${formatAverageRate(averageRate)} from ${ratingsCount} ${ratingsCount === 1 ? 'rating' : 'ratings'}`
      : `${formatAverageRate(averageRate)} average rating`
    : 'No ratings yet'

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      tabIndex={-1}
      aria-label={title}
      title={title}
      className={cn(
        'pointer-events-none text-muted-foreground',
        size === 'large' ? 'h-10 gap-2 px-3' : 'h-8 gap-1.5 px-2',
        showLabel && size === 'large' && 'px-4',
        hasAverage && 'text-amber-500',
      )}
    >
      <span className={cn('relative inline-flex shrink-0', iconSize)}>
        <Icon
          name="star"
          aria-hidden
          className={cn(iconSize, 'text-muted-foreground/35')}
        />
        {hasAverage ? (
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${Math.min(1, averageRate / 5) * 100}%` }}
          >
            <Icon
              name="star"
              aria-hidden
              className={cn(iconSize, 'fill-amber-400 text-amber-400')}
            />
          </span>
        ) : null}
      </span>
      {showLabel ? (
        <span
          className={cn(
            'font-medium',
            size === 'large' ? 'text-base' : 'text-sm',
          )}
        >
          Rating
        </span>
      ) : null}
      <span
        className={cn(
          'min-w-[2ch] font-medium tabular-nums',
          size === 'large' ? 'text-base' : 'text-sm',
        )}
      >
        {hasAverage ? formatAverageRate(averageRate) : '-'}
      </span>
    </Button>
  )
}

export default SetupAverageRateTrigger
