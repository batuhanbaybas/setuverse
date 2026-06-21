import { useEffect, useState } from 'react'

import { useSession } from '#/features/auth/lib/auth-client'
import useTriggerLikeSetup from '#/features/home/service/use-trigger-like-setup'
import { cn } from '#/shared/lib/utils'

import Icon from '../icons'
import { Button } from '../ui/button'

interface Props {
  setupId: string
  isLiked?: boolean
  likesCount?: number
}

function SetupLikeTrigger({
  setupId,
  isLiked = false,
  likesCount = 0,
}: Props) {
  const { data: session } = useSession()
  const triggerLikeSetup = useTriggerLikeSetup()

  const [optimisticLiked, setOptimisticLiked] = useState(isLiked)
  const [optimisticCount, setOptimisticCount] = useState(likesCount)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setOptimisticLiked(isLiked)
    setOptimisticCount(likesCount)
  }, [isLiked, likesCount])

  if (!setupId) {
    return (
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <Icon name="heart" className="size-4" />
        <span className="min-w-[1ch] text-sm font-medium tabular-nums">
          {likesCount}
        </span>
      </span>
    )
  }

  const isDisabled =
    !session?.user || triggerLikeSetup.isPending || optimisticLiked

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isDisabled) {
      return
    }

    const previousLiked = optimisticLiked
    const previousCount = optimisticCount

    setOptimisticLiked(true)
    setOptimisticCount((count) => count + 1)
    setIsAnimating(true)
    window.setTimeout(() => setIsAnimating(false), 350)

    triggerLikeSetup.mutate(
      { setupId },
      {
        onError: () => {
          setOptimisticLiked(previousLiked)
          setOptimisticCount(previousCount)
        },
      },
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={optimisticLiked ? 'Liked setup' : 'Like setup'}
      aria-pressed={optimisticLiked}
      disabled={isDisabled}
      title={
        !session?.user
          ? 'Sign in to like'
          : optimisticLiked
            ? 'Already liked'
            : 'Like setup'
      }
      onClick={handleClick}
      className={cn(
        'group h-8 gap-1.5 px-2 text-muted-foreground transition-colors hover:bg-rose-500/10 hover:text-rose-500 active:scale-95',
        optimisticLiked && 'text-rose-500 hover:text-rose-500',
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
          name="heart"
          className={cn(
            'size-4 transition-all duration-300',
            optimisticLiked && 'fill-current text-rose-500',
            isAnimating && 'text-rose-500',
          )}
        />
      </span>
      <span
        className={cn(
          'min-w-[1ch] text-sm font-medium tabular-nums transition-all duration-300',
          isAnimating && 'scale-110 text-rose-500',
        )}
      >
        {optimisticCount}
      </span>
    </Button>
  )
}

export default SetupLikeTrigger
