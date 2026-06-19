import useGetSetupItem from '#/features/create-setup/service/setup-items/use-get-setup-item-by-setup-id'



interface Props {
  setupId: string
}

function TagedItemsSection({setupId}: Props) {
  const { data: items } = useGetSetupItem(setupId)
  return (
    <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Tagged items</h2>
    <span className="text-sm text-muted-foreground">
      {items?.length} item{items?.length === 1 ? '' : 's'}
    </span>
  </div>
  )
}

export default TagedItemsSection