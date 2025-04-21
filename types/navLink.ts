import { LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons'

export interface NavLink {
  href?: string
  title?: string
  icon?: LucideIcon | IconType | React.ComponentType<{ className?: string }>
  ariaLabel: string
  external?: boolean
  links?: NavLink[]
  highlight?: boolean
}
