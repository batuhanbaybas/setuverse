import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { pageContainerClass } from '#/shared/lib/layout'

type CreateFlowFooterProps = {
  onSubmit: () => void
  isReady?: boolean
  isSubmitting?: boolean
  hint?: string
  error?: string | null
  buttonLabel?: string
}

function CreateFlowFooter({
  onSubmit,
  isReady = false,
  isSubmitting = false,
  hint,
  error,
  buttonLabel = 'Continue',
}: CreateFlowFooterProps) {
  if (!hint && !error && !isReady) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div
        className={`${pageContainerClass} flex flex-col gap-3 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between`}
      >
        <div className="space-y-1">
          {hint ? (
            <p className="text-sm text-muted-foreground">{hint}</p>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!isReady || isSubmitting}
          className="w-full sm:min-w-36 sm:w-auto"
        >
          {buttonLabel}
          <Icon name="chevron-right" />
        </Button>
      </div>
    </div>
  )
}

export default CreateFlowFooter
