import type { ReactNode } from 'react'
import { LuBookmark, LuHeart, LuMonitor } from 'react-icons/lu'

import { cn } from '#/shared/lib/utils'
import useGetProfileStats from '../service/use-get-profile-stats'
import ErrorState from '#/shared/components/error-state'

type StatItemProps = {
  icon: ReactNode
  value: number
  label: string
  className?: string
}

function formatStatNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  }

  return String(value)
}

function StatItem({ icon, value, label, className }: StatItemProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center gap-1 px-2 py-2 text-center sm:min-w-20 sm:px-4 lg:px-6',
        className,
      )}
    >
      {icon}
      <span className="text-xl font-semibold tabular-nums sm:text-2xl">
        {formatStatNumber(value)}
      </span>
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  )
}

function ProfileStats() {
  const { data: stats, isError, error } = useGetProfileStats()

  if (isError) {
    return <ErrorState message="Failed to load stats" error={error} />
  }

  return (
    <div className="w-full shrink-0 border-t pt-6 lg:w-auto lg:border-t-0 lg:border-l lg:pt-0 lg:pl-2">
      <div className="grid grid-cols-3 divide-x sm:flex sm:items-stretch">
        <StatItem
          icon={<LuMonitor className="size-4 text-muted-foreground sm:size-5" aria-hidden />}
          value={stats?.publishedSetupsCount ?? 0}
          label="Setups"
        />
        <StatItem
          icon={<LuHeart className="size-4 text-muted-foreground sm:size-5" aria-hidden />}
          value={stats?.receivedLikesCount ?? 0}
          label="Likes"
        />
        <StatItem
          icon={<LuBookmark className="size-4 text-muted-foreground sm:size-5" aria-hidden />}
          value={stats?.savedSetupsCount ?? 0}
          label="Saved"
        />
      </div>
    </div>
  )
}

export default ProfileStats
