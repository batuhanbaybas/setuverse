import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'

const steps = [
  {
    icon: 'layout-grid' as IconName,
    title: 'Browse setups',
    description:
      'Scroll real desk and workspace photos shared by the community.',
  },
  {
    icon: 'external-link' as IconName,
    title: 'Explore the gear',
    description:
      'Tap tagged items on the photo to see monitors, keyboards, and product links.',
  },
  {
    icon: 'upload' as IconName,
    title: 'Share yours',
    description:
      'Upload your photo, tag every item, and publish for others to discover.',
  },
] as const

function LandingHowItWorks() {
  return (
    <section className="mt-16 lg:mt-20">
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How it works
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Three simple steps to get started.
        </p>
      </div>

      <ol className="mt-8 grid gap-5 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="group relative rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Icon name={step.icon} className="size-5" aria-hidden />
              </span>
              <span
                aria-hidden
                className="text-3xl font-bold tabular-nums text-muted-foreground/20"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="mt-5 text-base font-semibold">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default LandingHowItWorks
