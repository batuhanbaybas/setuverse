import { useEffect, useState } from 'react'

import { useSession } from '#/features/auth/lib/auth-client'
import useGetCurrentUserSaveStatus from '#/features/home/service/use-get-current-user-save-status'
import useTriggerSaveSetup from '#/features/home/service/use-trigger-save-setup'
import { cn } from '#/shared/lib/utils'

import Icon from '../icons'
import { Button } from '../ui/button'

interface Props {
  setupId: string
}

function SetupSaveTrigger({ setupId }: Props) {
  const { data: session, isPending: isSessionPending } = useSession()
  const { data: saveStatus, isPending: isSaveStatusPending } =
    useGetCurrentUserSaveStatus(setupId)
  const triggerSaveSetup = useTriggerSaveSetup()

  const isSaved = saveStatus?.isSaved ?? false

  const [optimisticSaved, setOptimisticSaved] = useState(isSaved)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setOptimisticSaved(isSaved)
  }, [isSaved])

  if (!setupId) {
    return null
  }

  if (isSaveStatusPending) {
    return (
      <span className="inline-flex h-8 items-center px-2 text-muted-foreground">
        <Icon name="bookmark" className="size-4 opacity-50" />
      </span>
    )
  }

  const isDisabled =
    isSessionPending || !session?.user || triggerSaveSetup.isPending

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isDisabled) {
      return
    }

    const previousSaved = optimisticSaved
    const nextSaved = !optimisticSaved

    setOptimisticSaved(nextSaved)
    setIsAnimating(true)
    window.setTimeout(() => setIsAnimating(false), 350)

    triggerSaveSetup.mutate(
      { setupId },
      {
        onError: () => {
          setOptimisticSaved(previousSaved)
        },
      },
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={optimisticSaved ? 'Unsave setup' : 'Save setup'}
      aria-pressed={optimisticSaved}
      disabled={isDisabled}
      title={
        !session?.user
          ? 'Sign in to save'
          : optimisticSaved
            ? 'Unsave setup'
            : 'Save setup'
      }
      onClick={handleClick}
      className={cn(
        'group h-8 px-2 text-muted-foreground transition-colors hover:bg-sky-500/10 hover:text-sky-500 active:scale-95',
        optimisticSaved && 'text-sky-500 hover:text-sky-500',
        !session?.user && 'cursor-not-allowed opacity-60',
      )}
    >
      <span
        className={cn(
          'inline-flex transition-transform duration-300 ease-out',
          isAnimating && 'scale-[1.35]',
        )}
      >
        <Icon
          name="bookmark"
          className={cn(
            'size-4 transition-all duration-300',
            optimisticSaved && 'fill-current text-sky-500',
            isAnimating && 'text-sky-500',
          )}
        />
      </span>
    </Button>
  )
}

export default SetupSaveTrigger
