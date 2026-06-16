import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'

import { useCreateFlowContext } from '../context/create-flow-context'

function CreateFlowFooter() {
  const { triggerSubmit, submitState } = useCreateFlowContext()
  const { isReady, isSubmitting, hint, error } = submitState

  if (!hint && !error && !isReady) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex flex-col gap-3 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          {hint ? (
            <p className="text-sm text-muted-foreground">{hint}</p>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
        <Button
          type="button"
          onClick={triggerSubmit}
          disabled={!isReady || isSubmitting}
          className="sm:min-w-36"
        >
          Continue
          <Icon name="chevron-right" />
        </Button>
      </div>
    </div>
  )
}

export default CreateFlowFooter
