import { Badge } from "#/shared/components/ui/badge"
import type { PublisherInfo } from "."
import { Avatar, AvatarImage } from "../ui/avatar"

interface Props { 
    title: string
    category: string
    publisherInfo?: PublisherInfo
}


function SetupCardInfo({ title, category, publisherInfo }: Props) {
  return (
    <div className="p-4 space-y-3">
    <div>
      <h3 className="line-clamp-1 font-medium">
        {title}
      </h3>
      {publisherInfo ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={publisherInfo.avatarUrl} alt={publisherInfo.name} />
          </Avatar>
          <span className="text-sm font-medium">{publisherInfo.name}</span>
        </div>
      ) : null}
    </div>
    <div className="flex flex-wrap gap-1.5">
      <Badge variant="secondary">{category}</Badge>
    </div>
  </div>
  )
}

export default SetupCardInfo