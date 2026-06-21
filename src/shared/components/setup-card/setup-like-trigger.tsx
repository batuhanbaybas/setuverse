import { useEffect, useState } from 'react'

import { useSession } from '#/features/auth/lib/auth-client'
import useGetCurrentUserLikeStatus from '#/features/home/service/use-get-current-user-like-status'
import useTriggerLikeSetup from '#/features/home/service/use-trigger-like-setup'
import { cn } from '#/shared/lib/utils'

import Icon from '../icons'
import { Button } from '../ui/button'

interface Props {
  setupId: string
  size?: 'default' | 'large'
}

function SetupLikeTrigger({ setupId, size = 'default' }: Props) {
  const { data: session, isPending: isSessionPending } = useSession()
  const { data: likeStatus, isPending: isLikeStatusPending } =
    useGetCurrentUserLikeStatus(setupId)
  const triggerLikeSetup = useTriggerLikeSetup()

  const isLiked = likeStatus?.isLiked ?? false
  const likesCount = likeStatus?.likesCount ?? 0

  const [optimisticLiked, setOptimisticLiked] = useState(isLiked)
  const [optimisticCount, setOptimisticCount] = useState(likesCount)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setOptimisticLiked(isLiked)
  }, [isLiked])

  useEffect(() => {
    setOptimisticCount(likesCount)
  }, [likesCount])

  if (!setupId) {
    return null
  }

  if (isLikeStatusPending) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2 text-muted-foreground',
          size === 'large' ? 'h-10' : 'h-8',
        )}
      >
        <Icon
          name="heart"
          className={cn('opacity-50', size === 'large' ? 'size-5' : 'size-4')}
        />
        <span
          className={cn(
            'min-w-[1ch] font-medium tabular-nums opacity-50',
            size === 'large' ? 'text-base' : 'text-sm',
          )}
        >
          -
        </span>
      </span>
    )
  }

  const isDisabled =
    isSessionPending || !session?.user || triggerLikeSetup.isPending

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isDisabled) {
      return
    }

    const previousLiked = optimisticLiked
    const previousCount = optimisticCount
    const nextLiked = !optimisticLiked

    setOptimisticLiked(nextLiked)
    setOptimisticCount((count) =>
      Math.max(0, count + (nextLiked ? 1 : -1)),
    )
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
      aria-label={optimisticLiked ? 'Unlike setup' : 'Like setup'}
      aria-pressed={optimisticLiked}
      disabled={isDisabled}
      title={
        !session?.user
          ? 'Sign in to like'
          : optimisticLiked
            ? 'Unlike setup'
            : 'Like setup'
      }
      onClick={handleClick}
      className={cn(
        'group text-muted-foreground transition-colors hover:bg-rose-500/10 hover:text-rose-500 active:scale-95',
        size === 'large' ? 'h-10 gap-2 px-3' : 'h-8 gap-1.5 px-2',
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
            'transition-all duration-300',
            size === 'large' ? 'size-5' : 'size-4',
            optimisticLiked && 'fill-current text-rose-500',
            isAnimating && 'text-rose-500',
          )}
        />
      </span>
      <span
        className={cn(
          'min-w-[1ch] font-medium tabular-nums transition-all duration-300',
          size === 'large' ? 'text-base' : 'text-sm',
          isAnimating && 'scale-110 text-rose-500',
        )}
      >
        {optimisticCount}
      </span>
    </Button>
  )
}

export default SetupLikeTrigger
