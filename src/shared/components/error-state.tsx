import { cn } from '#/shared/lib/utils'

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.'

type ErrorStateProps = {
  error?: unknown
  message?: string
  className?: string
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}

function ErrorState({
  error,
  message = DEFAULT_ERROR_MESSAGE,
  className,
}: ErrorStateProps) {
  return (
    <section className={cn(className)}>
      <p className="text-sm text-destructive">
        {getErrorMessage(error, message)}
      </p>
    </section>
  )
}

export default ErrorState
export { DEFAULT_ERROR_MESSAGE }
