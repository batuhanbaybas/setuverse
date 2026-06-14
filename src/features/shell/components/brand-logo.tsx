import { Link } from '@tanstack/react-router'
import Icon from '#/shared/components/icons'

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-1">
      <Icon name="palanet" className="size-10 text-primary"  />
      <span className="text-2xl font-bold">Setuverse</span>
    </Link>
  )
}

export default BrandLogo
