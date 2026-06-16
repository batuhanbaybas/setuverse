import type { ReactNode } from 'react'
import { LuBookmark, LuHeart, LuMonitor } from 'react-icons/lu'

import { cn } from '#/shared/lib/utils'

type ProfileStatsProps = {
  publishedSetupsCount: number
  receivedLikesCount: number
  savedSetupsCount: number
}

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
        'flex min-w-24 flex-1 flex-col items-center gap-1 px-6 py-2 text-center first:pl-0 last:pr-0',
        className,
      )}
    >
      {icon}
      <span className="text-2xl font-semibold tabular-nums">
        {formatStatNumber(value)}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

function ProfileStats({
  publishedSetupsCount,
  receivedLikesCount,
  savedSetupsCount,
}: ProfileStatsProps) {
  return (
    <div className="w-full shrink-0 border-t pt-6 lg:w-auto lg:border-t-0 lg:border-l lg:pt-0 lg:pl-2">
      <div className="flex items-stretch divide-x">
        <StatItem
          icon={<LuMonitor className="size-5 text-muted-foreground" aria-hidden />}
          value={publishedSetupsCount}
          label="Setups"
        />
        <StatItem
          icon={<LuHeart className="size-5 text-muted-foreground" aria-hidden />}
          value={receivedLikesCount}
          label="Likes"
        />
        <StatItem
          icon={<LuBookmark className="size-5 text-muted-foreground" aria-hidden />}
          value={savedSetupsCount}
          label="Saved"
        />
      </div>
    </div>
  )
}

export default ProfileStats
