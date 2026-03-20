import { useEffect } from 'react'
import NavLink from './NavLink'
import SidebarProfile from './SidebarProfile'
import { NAV_SECTIONS } from '../data/navigation'

interface Props {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  setActiveSection: (id: string) => void
}

export default function Drawer({ isOpen, onClose, activeSection, setActiveSection }: Props) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/50 ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
        data-testid="drawer-backdrop"
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 left-0 z-[300] h-full w-56 bg-slate-900 flex flex-col p-4 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <SidebarProfile />

        <nav className="flex flex-col gap-1 flex-1">
          {NAV_SECTIONS.map(({ href, label, icon }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              icon={icon}
              isActive={activeSection === href.slice(1)}
              onClick={() => {
                setActiveSection(href.slice(1))
                onClose()
              }}
            />
          ))}
        </nav>

        {/* Social links */}
        <div className="flex gap-4 justify-center pt-4 border-t border-white/10">
          <a
            href="https://github.com/ruimendesM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-50 text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rui-mendes-2482465b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-50 text-sm"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </>
  )
}
