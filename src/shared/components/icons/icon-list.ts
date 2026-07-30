import type { IconType } from 'react-icons'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import {
  LuArrowUp,
  LuCheck,
  LuChevronRight,
  LuCircle,
  LuEllipsisVertical,
  LuLayoutGrid,
  LuCodeXml,
  LuGamepad2,
  LuImagePlus,
  LuLeaf,
  LuLoader,
  LuLogOut,
  LuMenu,
  LuShield,
  LuStar,
  LuUpload,
  LuUser,
  LuX,
  LuPlus,
  LuPencil,
  LuCalendar,
  LuTrash2,
  LuExternalLink,
  LuHeart,
  LuBookmark,
} from 'react-icons/lu'
import { TbPlanet } from 'react-icons/tb'
import { IoHome } from 'react-icons/io5'
import { LiaApple } from 'react-icons/lia'

export const iconList = [
  // general icons
  { name: 'palanet', icon: TbPlanet },
  { name: 'plus', icon: LuPlus },
  { name: 'upload', icon: LuUpload },
  { name: 'image-plus', icon: LuImagePlus },
  { name: 'loader', icon: LuLoader },
  { name: 'x', icon: LuX },
  { name: 'star', icon: LuStar },
  { name: 'circle', icon: LuCircle },
  { name: 'check', icon: LuCheck },
  { name: 'chevron-right', icon: LuChevronRight },
  { name: 'ellipsis-vertical', icon: LuEllipsisVertical },
  { name: 'home', icon: IoHome },
  { name: 'user', icon: LuUser },
  { name: 'shield', icon: LuShield },
  { name: 'log-out', icon: LuLogOut },
  { name: 'pencil', icon: LuPencil },
  { name: 'calendar', icon: LuCalendar },
  { name: 'menu', icon: LuMenu },
  { name: 'trash', icon: LuTrash2 },
  { name: 'external-link', icon: LuExternalLink },
  { name: 'heart', icon: LuHeart },
  { name: 'bookmark', icon: LuBookmark },
  { name: 'arrow-up', icon: LuArrowUp },
  // category icons
  { name: 'layout-grid', icon: LuLayoutGrid },
  { name: 'code', icon: LuCodeXml },
  { name: 'game-pad', icon: LuGamepad2 },
  { name: 'leaf', icon: LuLeaf },
  { name: 'apple', icon: LiaApple },
  // social icons
  { name: 'google', icon: FaGoogle },
  { name: 'github', icon: FaGithub },
] as const satisfies ReadonlyArray<{ name: string; icon: IconType }>

export type IconName = (typeof iconList)[number]['name']

export type IconListItem = {
  name: IconName
  icon: IconType
}
