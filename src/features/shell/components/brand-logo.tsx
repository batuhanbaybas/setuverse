import { Link } from '@tanstack/react-router'

import Icon from '#/shared/components/icons'

function BrandLogo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-1.5 sm:gap-2">
      <Icon name="palanet" className="size-8 shrink-0 text-primary sm:size-10" />
      <span className="truncate text-lg font-bold sm:text-2xl">Setuverse</span>
    </Link>
  )
}

export default BrandLogo
