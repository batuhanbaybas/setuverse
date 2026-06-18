import { Avatar, AvatarFallback, AvatarImage } from '#/shared/components/ui/avatar'
import { getInitials } from '../../lib/get-initial'



interface Props {
    image: string | null 
    name: string
}

function ProfilAvatar({ image, name }: Props) {
  return (
    <Avatar className="size-24 ring-2 ring-border">
      <AvatarImage src={image || undefined} alt={name || ''} />
      <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}

export default ProfilAvatar