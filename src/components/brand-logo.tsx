import { Link } from '@tanstack/react-router'
import { EarthIcon } from 'lucide-react'

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-1">
      <EarthIcon className="size-8" color='var(--primary)' />
      <span className="text-2xl font-bold">Setuverse</span>
    </Link>
  )
}

export default BrandLogo
