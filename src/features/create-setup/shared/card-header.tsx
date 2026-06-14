import {
  CardDescription,
  CardTitle,
} from '#/shared/components/ui/card/card-wrapper'

interface Props { 
    step: number
    title: string
    description: string
}


function CardHeader({ step, title, description }: Props) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
          {step}
        </span>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
      <CardDescription>
        {description}
      </CardDescription>
    </>
  )
}

export default CardHeader
