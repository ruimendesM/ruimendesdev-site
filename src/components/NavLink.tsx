interface Props {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function NavLink({ href, label, isActive, onClick }: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-sm no-underline transition-colors ${
        isActive
          ? 'bg-white/15 text-slate-50 font-semibold'
          : 'text-slate-300 hover:bg-white/10'
      }`}
    >
      {label}
    </a>
  )
}
