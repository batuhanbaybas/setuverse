import { Badge } from '#/shared/components/ui/badge'
import type { PublisherInfo } from '.'
import { Avatar, AvatarImage } from '../ui/avatar'
import SetupLikeTrigger from './setup-like-trigger'

interface Props {
  setupId: string
  title: string
  category: string
  publisherInfo?: PublisherInfo
  likesCount?: number
}

function SetupCardInfo({ setupId, title, category, publisherInfo, likesCount }: Props) {
  return (
    <div className="p-4 space-y-3">
      <div>
        <h3 className="line-clamp-1 font-medium">{title}</h3>
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
        <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
          <SetupLikeTrigger setupId={setupId} />
          <span className="text-sm font-medium">{likesCount ?? 0}</span>
        </span>
      </div>
    </div>
  )
}

export default SetupCardInfo
