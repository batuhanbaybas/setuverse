import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import MobileCategorySheet from './mobile-category-sheet'
import MobileCategoryTrigger from './mobile-category-trigger'
import useCategoryFilter from './use-category-filter'

function MobileCategoryFilter() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { allCategories, selected, selectedCategory } = useCategoryFilter()

  const handleSelect = (slug: string) => {
    setOpen(false)

    if (!slug) {
      void navigate({ to: '/setups' })
      return
    }

    void navigate({ to: '/setups', search: { category: slug } })
  }

  return (
    <>
      <MobileCategoryTrigger selected={selected} onOpen={() => setOpen(true)} />

      <MobileCategorySheet
        open={open}
        onOpenChange={setOpen}
        allCategories={allCategories}
        selectedCategory={selectedCategory}
        onSelect={handleSelect}
      />
    </>
  )
}

export default MobileCategoryFilter
