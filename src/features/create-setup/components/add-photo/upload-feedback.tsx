import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { cn } from '#/shared/lib/utils'

type UploadFeedbackProps = {
  message: string
  onDismiss?: () => void
  className?: string
}

function UploadFeedback({ message, onDismiss, className }: UploadFeedbackProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive',
        className,
      )}
    >
      <span className="flex-1">{message}</span>
      {onDismiss ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          <Icon name="x" className="size-3.5" />
        </Button>
      ) : null}
    </div>
  )
}

export default UploadFeedback
