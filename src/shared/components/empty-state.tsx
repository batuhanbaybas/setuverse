interface Props {
    title: string
    description: string
}

function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-xl border border-dashed px-6 py-16 text-center">
    <p className="text-sm font-medium">{title}</p>
    <p className="mt-1 text-sm text-muted-foreground">
      {description}
    </p>
  </div>
  )
}

export default EmptyState