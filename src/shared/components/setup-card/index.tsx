import type { ReactNode } from 'react'

import SetupImage from '#/shared/components/setup-card/setup-image'
import { cn } from '#/shared/lib/utils'
import { Link } from '@tanstack/react-router'
import Card from '../ui/card'
import SetupCardInfo from './setup-card-info'

export type PublisherInfo = {
  name: string
  avatarUrl: string
}

interface Props {
  setupId?: string
  imageUrl: string
  title: string
  category: string
  itemsCount?: number
  isProfilePage?: boolean
  ownerActions?: ReactNode
  publisherInfo?: PublisherInfo
}

function SetupCard({
  setupId,
  imageUrl,
  title,
  category,
  itemsCount,
  publisherInfo,
  isProfilePage = false,
  ownerActions,
}: Props) {
  const card = (
    <Card
      wrapperProps={{
        className: cn(
          'overflow-hidden rounded-xl border transition-shadow pt-0 hover:shadow-2xl pb-1' ,
          isProfilePage && 'h-[320px] sm:h-[390px]',
        ),
      }}
      cardContentProps={{
        className: 'space-y-5 sm:px-0 px-0',
        children: (
          <>
            <div className="relative grid aspect-video overflow-hidden bg-muted">
              <SetupImage
                imageUrl={imageUrl}
                alt={title}
                className="size-full object-cover object-top"
              />
              {itemsCount !== undefined ? (
                <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                </span>
              ) : null}
            </div>
            <SetupCardInfo
              setupId={setupId}
              title={title}
              category={category}
              publisherInfo={publisherInfo}
            />
          </>
        ),
      }}
    />
  )

  const cardWithOwnerActions = ownerActions ? (
    <div className="relative">
      {card}
      <div className="absolute top-2 right-2 z-10">{ownerActions}</div>
    </div>
  ) : (
    card
  )

  if (!setupId) {
    return cardWithOwnerActions
  }

  if (ownerActions) {
    return (
      <div className="relative">
        <Link to="/setup/$id" params={{ id: setupId }} className="block">
          {card}
        </Link>
        <div className="absolute top-2 right-2 z-10">{ownerActions}</div>
      </div>
    )
  }

  return (
    <Link to="/setup/$id" params={{ id: setupId }} className="block">
      {card}
    </Link>
  )
}

export default SetupCard
