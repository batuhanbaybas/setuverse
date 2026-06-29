import useGetCurrentUserRateStatus from '#/features/setup-rate/service/use-get-current-user-rate-status'
import { formatAverageRate } from '#/shared/lib/format-average-rate'
import { cn } from '#/shared/lib/utils'

import Icon from '../icons'

interface Props {
  setupId: string
}

function SetupAverageRateBadge({ setupId }: Props) {
  const { data: rateStatus, isPending } = useGetCurrentUserRateStatus(setupId)

  if (!setupId || isPending) {
    return null
  }

  const averageRate = rateStatus?.averageRate ?? null
  const ratingsCount = rateStatus?.ratingsCount ?? 0
  const hasAverage = averageRate != null && averageRate > 0

  if (!hasAverage) {
    return null
  }

  const title =
    ratingsCount > 0
      ? `${formatAverageRate(averageRate)} from ${ratingsCount} ${ratingsCount === 1 ? 'rating' : 'ratings'}`
      : `${formatAverageRate(averageRate)} average rating`

  return (
    <span
      aria-label={title}
      title={title}
      className={cn(
        'absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md',
        'bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm',
      )}
    >
      <Icon
        name="star"
        aria-hidden
        className="size-3 fill-amber-400 text-amber-400"
      />
      <span className="tabular-nums">{formatAverageRate(averageRate)}</span>
      {ratingsCount > 0 ? (
        <span className="tabular-nums text-white/80">({ratingsCount})</span>
      ) : null}
    </span>
  )
}

export default SetupAverageRateBadge
