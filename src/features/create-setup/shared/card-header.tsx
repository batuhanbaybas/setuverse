import {
  CardDescription,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'
import { Badge } from '#/shared/components/ui/badge'

interface Props {
  step: number
  title: string
  description: string
  badge?: string
}

function CardHeader({ step, title, description, badge }: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
          {step}
        </span>
        <CardTitle className="text-lg">{title}</CardTitle>
        {badge ? (
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            {badge}
          </Badge>
        ) : null}
      </div>
      <CardDescription>{description}</CardDescription>
    </>
  )
}

export default CardHeader
