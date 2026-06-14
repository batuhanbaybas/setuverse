import Icon from '#/shared/components/icons'
import { cn } from '#/shared/lib/utils'

type AddMoreTileProps = {
  disabled?: boolean
  onClick: () => void
}

function AddMoreTile({ disabled, onClick }: AddMoreTileProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex aspect-square w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/20 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-50',
      )}
    >
      <Icon name="plus" className="size-5" />
      <span className="text-sm font-medium">Add more</span>
    </button>
  )
}

export default AddMoreTile
