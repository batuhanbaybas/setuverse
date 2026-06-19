import { useState } from 'react'
import type { MouseEvent } from 'react'

import SetupImage from '#/shared/components/setup-card/setup-image'
import { cn } from '#/shared/lib/utils'

import { Button } from '#/shared/components/ui/button'
import calculateImageRect from '#/shared/lib/image-rect-calculator'
import useGetSetupDraft from '../../service/use-get-setup-draft'
import useGetSetupItem from '../../service/setup-items/use-get-setup-item-by-setup-id'
import TagItemDialog from '../setup-tags/tag-item-dialog/tag-item-dialog'

type Props = {
  setupId: string
}
export type TagItemPositions = { x: number | null; y: number | null }

function TagCanvas({ setupId }: Props) {
  const { data: setup } = useGetSetupDraft(setupId)
  const { data: items } = useGetSetupItem(setupId)
  const [itemsPositions, setItemsPositions] = useState<TagItemPositions>({
    x: null,
    y: null,
  })

  const handleImageClick = (event: MouseEvent<HTMLImageElement>) => {
    const { x, y } = calculateImageRect(event)
    setItemsPositions({ x, y })
  }

  return (
    <div className="flex items-center justify-center rounded-xl border bg-muted/20 p-2 sm:p-4">
      <div className="relative inline-flex max-w-full">
        <TagItemDialog
          setupId={setupId}
          itemsPositions={itemsPositions}
          triggerProps={{
            children: (
              <SetupImage
                imageUrl={setup?.imageUrl}
                alt="Setup preview"
                className="max-w-full cursor-crosshair rounded-lg object-contain"
                onClick={handleImageClick}
              />
            ),
          }}
        />
        {items?.map((item, index) => {
          return (
            <TagItemDialog
              setupId={setupId}
              itemId={item.id}
              item={item}
              itemsPositions={itemsPositions}
              triggerProps={{
                children: (
                  <Button
                    key={item.id}
                    variant="outline"
                    size="icon"
                    className={cn(
                      'absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform sm:size-7',
                      'bg-primary/85 hover:scale-110 hover:bg-primary focus:scale-110 focus:bg-primary/85 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                    )}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    aria-label={`Tag ${index + 1}: ${item.name}`}
                  >
                    {index + 1}
                  </Button>
                ),
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TagCanvas
