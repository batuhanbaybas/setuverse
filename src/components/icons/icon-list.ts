import type { IconType } from 'react-icons'
import { FaGoogle } from 'react-icons/fa6'
import { LuPlus,LuCheck, LuChevronRight, LuCircle } from 'react-icons/lu'
import { TbPlanet } from 'react-icons/tb'
import { IoHome } from 'react-icons/io5'

export const iconList = [
  // general icons
  { name: 'palanet', icon: TbPlanet },
  { name: 'plus', icon: LuPlus },
  { name: 'circle', icon: LuCircle },
  { name: 'check', icon: LuCheck },
  { name: 'chevron-right', icon: LuChevronRight },
  { name: 'home', icon: IoHome },
  // social icons
  { name: 'google', icon: FaGoogle },
] as const satisfies ReadonlyArray<{ name: string; icon: IconType }>

export type IconName = (typeof iconList)[number]['name']

export type IconListItem = {
  name: IconName
  icon: IconType
}
