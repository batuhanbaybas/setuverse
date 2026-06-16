import DesktopCategoryNav from './desktop-category-nav'
import MobileCategoryFilter from './mobile-category-filter'

function Categories() {
  return (
    <>
      <div className="md:hidden">
        <MobileCategoryFilter />
      </div>

      <DesktopCategoryNav />
    </>
  )
}

export default Categories
