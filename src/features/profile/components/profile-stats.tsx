import { LuMonitor } from 'react-icons/lu'

type ProfileStatsProps = {
  publishedSetupsCount: number
}

function ProfileStats({ publishedSetupsCount }: ProfileStatsProps) {
  return (
    <div className="flex shrink-0 items-center gap-8 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
      <div className="flex min-w-24 flex-col items-center gap-1 text-center">
        <LuMonitor className="size-5 text-muted-foreground" aria-hidden />
        <span className="text-2xl font-semibold tabular-nums">
          {publishedSetupsCount}
        </span>
        <span className="text-sm text-muted-foreground">Setups</span>
      </div>
    </div>
  )
}

export default ProfileStats
