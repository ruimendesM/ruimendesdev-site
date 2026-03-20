import { useState } from 'react'
import Sidebar from './components/Sidebar'
import About from './components/sections/About'
import Career from './components/sections/Career'

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
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
      <main className="flex-1 px-10 py-8 max-w-[860px] pt-20 md:pt-8">
        <About />
        <Career />
      </main>
    </div>
  )
}
