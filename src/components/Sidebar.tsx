import SidebarProfile from './SidebarProfile'
import NavLink from './NavLink'

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#career', label: 'Career' },
  { href: '#projects', label: 'Projects' },
  { href: '#talks', label: 'Talks' },
  { href: '#contact', label: 'Contact' },
]

interface Props {
  activeSection: string;
}

export default function Sidebar({ activeSection }: Props) {
  return (
    <aside className="hidden md:flex w-48 min-w-[12rem] h-screen sticky top-0 bg-slate-900 text-slate-50 p-6 flex-col gap-1 overflow-y-auto">
      <SidebarProfile />
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={activeSection === item.href.slice(1)}
            onClick={() => {}}
          />
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-2">
        <a
          href="https://github.com/ruimendesM"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs text-slate-400 border border-white/15 rounded-md px-3 py-1.5 no-underline hover:bg-white/10 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/rui-mendes-2482465b/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs text-slate-400 border border-white/15 rounded-md px-3 py-1.5 no-underline hover:bg-white/10 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </aside>
  )
}
