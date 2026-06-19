import { Badge } from "#/shared/components/ui/badge"

interface Props { 
    title: string
    category: string
}


function SetupCardInfo({ title, category }: Props) {
  return (
    <div className="p-4 space-y-3">
    <div>
      <h3 className="line-clamp-1 font-medium">
        {title}
      </h3>
    </div>
    <div className="flex flex-wrap gap-1.5">
      <Badge variant="secondary">{category}</Badge>
    </div>
  </div>
  )
}

export default SetupCardInfo