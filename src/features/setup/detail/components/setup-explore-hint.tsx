import Icon from '#/shared/components/icons'

function SetupExploreHint() {
  return (
    <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
      <Icon
        name="circle"
        className="mt-0.5 size-4 shrink-0 text-primary"
        aria-hidden
      />
      <p className="leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Explore this setup.</span>{' '}
        Select an item from the list
        <span className="hidden md:inline">
          {' '}
          or click a numbered tag on the photo
        </span>{' '}
        to see what gear is in this workspace.
      </p>
    </div>
  )
}

export default SetupExploreHint
