import { Link } from '@tanstack/react-router'

import type { MostLikedSetup } from '#/features/home/server/get-most-liked-setups.functions'
import Icon from '#/shared/components/icons'
import SetupImage from '#/shared/components/setup-card/setup-image'
import LinkButton from '#/shared/components/ui/button/link-button'
import { cn } from '#/shared/lib/utils'

type LandingMostLikedSetupsProps = {
  setups: MostLikedSetup[]
}

function LikeCount({ count }: { count: number }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold tabular-nums text-rose-500">
      <Icon name="heart" className="size-4 fill-current" aria-hidden />
      {count}
    </span>
  )
}

function RankedSetupCard({ setup, rank }: { setup: MostLikedSetup; rank: number }) {
  const likesCount = setup._count.likes
  const title = setup.title ?? 'Untitled setup'

  return (
    <Link
      to="/setup/$id"
      params={{ id: setup.id }}
      className="group flex items-center gap-4 rounded-xl border bg-card p-3 transition-shadow hover:shadow-md sm:p-4"
    >
      <span
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
          rank === 1
            ? 'bg-rose-500/10 text-rose-500'
            : 'bg-muted text-muted-foreground',
        )}
      >
        {rank}
      </span>
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-20">
        <SetupImage
          imageUrl={setup.imageUrl}
          alt={title}
          className="size-full object-cover object-top"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{title}</h3>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {setup.user.name}
        </p>
      </div>
      <LikeCount count={likesCount} />
    </Link>
  )
}

function LandingMostLikedSetups({ setups = [] }: LandingMostLikedSetupsProps) {
  if (setups.length === 0) {
    return null
  }

  return (
    <section className="mt-16 lg:mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Community favorites
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The most liked setups from the community right now.
          </p>
        </div>
        <LinkButton to="/setups" variant="outline" size="sm" className="shrink-0">
          Browse all
          <Icon name="chevron-right" aria-hidden />
        </LinkButton>
      </div>

      <ol className="mt-6 space-y-3">
        {setups.map((setup, index) => (
          <li key={setup.id}>
            <RankedSetupCard setup={setup} rank={index + 1} />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default LandingMostLikedSetups
