import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Drawer from './components/Drawer'
import About from './components/sections/About'
import Career from './components/sections/Career'
import Projects from './components/sections/Projects'
import Talks from './components/sections/Talks'
import Contact from './components/sections/Contact'
import { useScrollSpy } from './hooks/useScrollSpy'

const SECTION_IDS = ['about', 'career', 'projects', 'talks', 'contact']

export default function App() {
  const activeSection = useScrollSpy(SECTION_IDS)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSection={activeSection} />
      <button
        className="flex md:hidden fixed top-4 left-4 z-[100] bg-slate-900 text-slate-50 w-10 h-10 rounded-lg text-xl cursor-pointer items-center justify-center border-0"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} activeSection={activeSection} />
      <main className="flex-1 px-10 pb-8 pt-20 md:pt-8 max-w-[860px]">
        <About />
        <Career />
        <Projects />
        <Talks />
        <Contact />
      </main>
    </div>
  )
}
