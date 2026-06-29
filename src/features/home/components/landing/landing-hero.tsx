import { useSession } from '#/features/auth/lib/auth-client'
import Icon from '#/shared/components/icons'
import LinkButton from '#/shared/components/ui/button/link-button'

function LandingHero() {
  const { data: session } = useSession()

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/15 blur-3xl sm:size-96"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Icon name="palanet" className="size-3.5" aria-hidden />
          Workspace inspiration
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]">
          Discover real desk setups.
          <span className="mt-1 block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Explore every item inside.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          Setuverse is a community gallery of workspace photos — each one tagged
          with the monitors, keyboards, and gear inside. Find inspiration, save
          favorites, or share your own setup.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton to="/setups" size="lg" className="min-w-44 shadow-lg shadow-primary/20">
            <Icon name="layout-grid" aria-hidden />
            Browse setups
          </LinkButton>
          {session ? (
            <LinkButton to="/create" variant="outline" size="lg" className="min-w-44">
              <Icon name="upload" aria-hidden />
              Share your setup
            </LinkButton>
          ) : (
            <LinkButton
              to="/login"
              search={{ redirect: '/create' }}
              variant="outline"
              size="lg"
              className="min-w-44"
            >
              Sign in to share
            </LinkButton>
          )}
        </div>

        {!session ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Browsing is free — no account needed.
          </p>
        ) : null}

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground sm:text-sm">
          <li className="inline-flex items-center gap-1.5">
            <Icon name="image-plus" className="size-3.5 text-primary" aria-hidden />
            Tagged photos
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Icon name="heart" className="size-3.5 text-primary" aria-hidden />
            Community curated
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Icon name="bookmark" className="size-3.5 text-primary" aria-hidden />
            Save favorites
          </li>
        </ul>
      </div>
    </section>
  )
}

export default LandingHero
