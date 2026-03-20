import type { LucideIcon } from 'lucide-react'

interface Props {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
}

export default function NavLink({ href, label, isActive, onClick = () => {}, icon: Icon }: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm no-underline transition-colors ${
        isActive
          ? 'bg-white/15 text-slate-50 font-semibold'
          : 'text-slate-300 hover:bg-white/10'
      }`}
    >
      {Icon && <Icon size={16} aria-hidden="true" />}
      {label}
    </a>
  )
}
