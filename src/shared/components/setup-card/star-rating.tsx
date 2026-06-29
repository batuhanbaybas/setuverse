import { useState } from 'react'

import { cn } from '#/shared/lib/utils'

import Icon from '../icons'
import { Button } from '../ui/button'
import useUpdateSetupRate from '#/features/setup-rate/service/use-update-setup-rate'

const STAR_COUNT = 5

export type StarRatingSize = 'default' | 'large'

interface StarRatingProps {
  value: number | null
  size?: StarRatingSize
  interactive?: boolean
  onHoverValueChange?: (value: number | null) => void
  setupId: string
}

function StarRating({
  value,
  size = 'default',
  interactive = true,
  onHoverValueChange,
  setupId,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const iconSize = size === 'large' ? 'size-5' : 'size-4'
  const updateSetupRateMutation = useUpdateSetupRate()
  const displayValue = hoverValue ?? value

  const handleHover = (nextValue: number | null) => {
    if (!interactive) {
      return
    }

    setHoverValue(nextValue)
    onHoverValueChange?.(nextValue)
  }

  const handlePointerInteraction = (
    event: React.MouseEvent | React.PointerEvent,
  ) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleStarClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    starValue: number,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    handlePointerInteraction(event)

    if (!interactive) {
      return
    }

    await updateSetupRateMutation.mutateAsync({
      setupId,
      rate: starValue,
    })
  }

  return (
    <span
      className="inline-flex items-center gap-0.5"
      onMouseLeave={() => handleHover(null)}
      onClick={handlePointerInteraction}
      onMouseDown={handlePointerInteraction}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const fill =
          displayValue == null
            ? 0
            : Math.min(1, Math.max(0, displayValue - index))

        return (
          <Button
            variant="ghost"
            size="icon"
            key={index}
            className={cn(
              'relative inline-flex shrink-0',
              iconSize,
              interactive && 'cursor-pointer',
            )}
            onClick={(event) => handleStarClick(event, index + 1)}
            onMouseDown={handlePointerInteraction}
            onMouseEnter={() => handleHover(index + 1)}
          >
            <Icon
              name="star"
              aria-hidden
              className={cn(iconSize, 'text-muted-foreground/35')}
            />
            {fill > 0 ? (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Icon
                  name="star"
                  aria-hidden
                  className={cn(iconSize, 'fill-amber-400 text-amber-400')}
                />
              </span>
            ) : null}
          </Button>
        )
      })}
    </span>
  )
}

export default StarRating
