import { Badge } from '#/shared/components/ui/badge'

import type { PublisherInfo } from '.'
import { Avatar, AvatarImage } from '../ui/avatar'
import Tooltip from '../ui/tooltip-root'
import SetupAverageRateTrigger from './setup-average-rate-trigger'
import SetupLikeTrigger from './setup-like-trigger'
import SetupRateTrigger from './setup-rate-trigger'
import SetupSaveTrigger from './setup-save-trigger'

interface Props {
  setupId: string
  title: string
  category: string
  publisherInfo?: PublisherInfo
}

function SetupCardInfo({
  setupId,
  title,
  category,
  publisherInfo,
}: Props) {
  return (
    <div className="p-4 space-y-3 flex flex-col gap-3 justify-between">
      <div className="flex flex-col gap-2">
        <Tooltip
          triggerProps={{
            asChild: true,
            children: (
                <h3 className="truncate max-w-full w-fit font-medium">{title}</h3>
            ),
          }}
          contentProps={{
            children: <h3>{title}</h3>,
          }}
        />
        {publisherInfo ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={publisherInfo.avatarUrl}
                alt={publisherInfo.name}
              />
            </Avatar>
            <span className="text-sm font-medium">{publisherInfo.name}</span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="secondary">{category}</Badge>
        <span
          className="relative z-10 ml-auto flex items-center gap-0.5"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <SetupRateTrigger setupId={setupId} />
          <SetupAverageRateTrigger setupId={setupId} />
          <SetupSaveTrigger setupId={setupId} />
          <SetupLikeTrigger setupId={setupId} />
        </span>
      </div>
    </div>
  )
}

export default SetupCardInfo
