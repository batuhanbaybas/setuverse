import useGetSetupItem from '#/features/create-setup/service/use-get-setup-item'
import { useParams } from '@tanstack/react-router'
import React from 'react'



function TagedItemsSection() {
  const { id: setupId } = useParams({ from: '/create/$id/review' })
  const { data: items } = useGetSetupItem(setupId)
  return (
    <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Tagged items</h2>
    <span className="text-sm text-muted-foreground">
      {items.length} item{items.length === 1 ? '' : 's'}
    </span>
  </div>
  )
}

export default TagedItemsSection