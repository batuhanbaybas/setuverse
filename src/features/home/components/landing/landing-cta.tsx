import { useSession } from '#/features/auth/lib/auth-client'
import LinkButton from '#/shared/components/ui/button/link-button'
import Icon from '#/shared/components/icons'

function LandingCta() {
  const { data: session } = useSession()

  return (
    <section className="relative mt-16 overflow-hidden rounded-2xl border lg:mt-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 right-0 size-48 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative px-6 py-12 text-center sm:px-10 sm:py-14">
        <Icon
          name="palanet"
          className="mx-auto size-10 text-primary"
          aria-hidden
        />
        <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
          Ready to explore?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
          Jump into the feed and see what the community has built — or start
          tagging your own workspace.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton to="/setups" size="lg">
            View all setups
          </LinkButton>
          {session ? (
            <LinkButton to="/create" variant="outline" size="lg">
              Upload yours
            </LinkButton>
          ) : (
            <LinkButton
              to="/login"
              search={{ redirect: '/create' }}
              variant="outline"
              size="lg"
            >
              Sign in to upload
            </LinkButton>
          )}
        </div>
      </div>
    </section>
  )
}

export default LandingCta
