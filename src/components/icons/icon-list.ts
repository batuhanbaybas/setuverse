import type { IconType } from 'react-icons'
import { FaGoogle } from 'react-icons/fa6'
import { LuPlus } from 'react-icons/lu'
import { TbPlanet } from 'react-icons/tb'

export const iconList = [
  { name: 'palanet', icon: TbPlanet },
  { name: 'plus', icon: LuPlus },
  { name: 'google', icon: FaGoogle },
] as const satisfies ReadonlyArray<{ name: string; icon: IconType }>

export type IconName = (typeof iconList)[number]['name']

export type IconListItem = {
  name: IconName
  icon: IconType
}
