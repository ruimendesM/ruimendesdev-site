import type { LucideIcon } from 'lucide-react'
import { User, Briefcase, FolderOpen, Mic2, Mail } from 'lucide-react'

export interface NavSection {
  href: string
  label: string
  icon: LucideIcon
}

export const NAV_SECTIONS: NavSection[] = [
  { href: '#about',    label: 'About',    icon: User },
  { href: '#career',   label: 'Career',   icon: Briefcase },
  { href: '#projects', label: 'Projects', icon: FolderOpen },
  { href: '#talks',    label: 'Talks',    icon: Mic2 },
  { href: '#contact',  label: 'Contact',  icon: Mail },
]
