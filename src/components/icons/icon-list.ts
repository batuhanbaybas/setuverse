import type { IconType } from 'react-icons'
import { FaGoogle } from 'react-icons/fa6'
import {
  LuPlus,
  LuCheck,
  LuChevronRight,
  LuCircle,
  LuLayoutGrid,
  LuCodeXml,
  LuGamepad2,
  LuLeaf,
} from 'react-icons/lu'
import { TbPlanet } from 'react-icons/tb'
import { IoHome } from 'react-icons/io5'
import { LiaApple } from 'react-icons/lia'

export const iconList = [
  // general icons
  { name: 'palanet', icon: TbPlanet },
  { name: 'plus', icon: LuPlus },
  { name: 'circle', icon: LuCircle },
  { name: 'check', icon: LuCheck },
  { name: 'chevron-right', icon: LuChevronRight },
  { name: 'home', icon: IoHome },
  // category icons
  { name: 'layout-grid', icon: LuLayoutGrid },
  { name: 'code', icon: LuCodeXml },
  { name: 'game-pad', icon: LuGamepad2 },
  { name: 'leaf', icon: LuLeaf },
  { name: 'apple', icon: LiaApple },
  // social icons
  { name: 'google', icon: FaGoogle },
] as const satisfies ReadonlyArray<{ name: string; icon: IconType }>

export type IconName = (typeof iconList)[number]['name']

export type IconListItem = {
  name: IconName
  icon: IconType
}
