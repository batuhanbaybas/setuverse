import { useEffect, useState } from 'react'

import { useSession } from '#/features/auth/lib/auth-client'
import useGetCurrentUserSaveStatus from '#/features/home/service/use-get-current-user-save-status'
import useTriggerSaveSetup from '#/features/home/service/use-trigger-save-setup'
import { cn } from '#/shared/lib/utils'

import Icon from '../icons'
import { Button } from '../ui/button'

interface Props {
  setupId: string
  size?: 'default' | 'large'
  showLabel?: boolean
}

function SetupSaveTrigger({
  setupId,
  size = 'default',
  showLabel = false,
}: Props) {
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
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2 text-muted-foreground',
          size === 'large' ? 'h-10' : 'h-8',
          showLabel && size === 'large' && 'gap-2 px-4',
        )}
      >
        <Icon
          name="bookmark"
          className={cn('opacity-50', size === 'large' ? 'size-5' : 'size-4')}
        />
        {showLabel ? (
          <span
            className={cn(
              'font-medium opacity-50',
              size === 'large' ? 'text-base' : 'text-sm',
            )}
          >
            Save
          </span>
        ) : null}
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
        'group text-muted-foreground transition-colors hover:bg-sky-500/10 hover:text-sky-500 active:scale-95',
        size === 'large' ? 'h-10 gap-2 px-3' : 'h-8 px-2',
        showLabel && size === 'large' && 'px-4',
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
            'transition-all duration-300',
            size === 'large' ? 'size-5' : 'size-4',
            optimisticSaved && 'fill-current text-sky-500',
            isAnimating && 'text-sky-500',
          )}
        />
      </span>
      {showLabel ? (
        <span
          className={cn(
            'font-medium transition-all duration-300',
            size === 'large' ? 'text-base' : 'text-sm',
            isAnimating && 'text-sky-500',
          )}
        >
          {optimisticSaved ? 'Saved' : 'Save'}
        </span>
      ) : null}
    </Button>
  )
}

export default SetupSaveTrigger
