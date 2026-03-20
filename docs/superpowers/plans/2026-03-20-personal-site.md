# Personal Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal website for Rui Mendes with a sidebar nav, five content sections (About, Career, Projects, Talks, Contact), and a mobile slide-in drawer.

**Architecture:** Single-page Vite + React + TypeScript app. Fixed left sidebar on desktop (≥768px); hamburger button + slide-in drawer on mobile. All content hardcoded in `src/data/`. Scroll-spy highlights the active nav link via `IntersectionObserver`. No routing — anchor-based smooth scroll only.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS v4, Vitest + React Testing Library

---

## File Map

```
src/
  components/
    Sidebar.tsx              # Desktop sidebar — composes NavLink + SidebarProfile + social links
    Sidebar.test.tsx
    Drawer.tsx               # Mobile slide-in drawer — independent of Sidebar, same primitives
    Drawer.test.tsx
    SidebarProfile.tsx       # Shared: avatar + name + title
    SidebarProfile.test.tsx
    NavLink.tsx              # Shared nav link (href, label, isActive, onClick)
    NavLink.test.tsx
    sections/
      About.tsx
      About.test.tsx
      Career.tsx
      Career.test.tsx
      CareerItem.tsx         # Single timeline entry
      Projects.tsx
      Projects.test.tsx
      ProjectCard.tsx        # Single project card
      Talks.tsx
      Talks.test.tsx
      TalkCard.tsx           # Single talk entry
      Contact.tsx
      Contact.test.tsx
  hooks/
    useScrollSpy.ts          # IntersectionObserver hook — returns active section id
    useScrollSpy.test.ts
  data/
    career.ts                # CareerEntry[] — 7 roles (Hostelworld collapsed into one)
    projects.ts              # Project[] — 5 curated projects
    talks.ts                 # Talk[] — 2 conference talks
  App.tsx                    # Root: layout shell, drawerOpen state, scroll-spy wiring
  main.tsx                   # Vite entry point (unchanged after scaffold)
  index.css                  # Tailwind import + global scroll-behavior
  test-setup.ts              # Vitest setup — imports @testing-library/jest-dom
```

No `.module.css` files — all styling is done with Tailwind utility classes directly in JSX.

---

### Task 1: Project scaffolding, Tailwind CSS, and test setup

**Files:**
- Create: `src/index.css`
- Create: `src/test-setup.ts`
- Create: `vite.config.ts` (updated for Tailwind + Vitest)
- Modify: `src/App.tsx` (clear boilerplate)
- Delete: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`

- [ ] **Step 1: Scaffold the project**

Run inside `/Users/ruimendes/Projects/ruimendesdev-site`:

```bash
npm create vite@latest . -- --template react-ts
```

When prompted about the non-empty directory, choose **Yes** (Vite will not touch the `docs/` folder). Then install dependencies:

```bash
npm install
```

- [ ] **Step 2: Install Tailwind CSS v4**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Install Vitest and React Testing Library**

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 4: Configure Vite (Tailwind plugin + Vitest)**

Replace the contents of `vite.config.ts` with:

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
})
```

- [ ] **Step 5: Create test setup file**

Create `src/test-setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test scripts to package.json**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Set up global CSS**

Replace `src/index.css` with:

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}
```

That single `@import` line is all Tailwind v4 needs — no config file required.

- [ ] **Step 8: Clear App.tsx boilerplate**

Replace `src/App.tsx` with:

```typescript
function App() {
  return <div className="text-slate-900">Hello Rui</div>
}

export default App
```

- [ ] **Step 9: Delete boilerplate files**

```bash
rm src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 10: Verify the dev server works**

```bash
npm run dev
```

Open http://localhost:5173 — should show "Hello Rui". Open browser devtools and inspect the element — it should have `color: rgb(15, 23, 42)` (Tailwind's `slate-900`), confirming Tailwind is working.

- [ ] **Step 11: Verify tests pass**

```bash
npm test
```

Expected: no test files found, exits 0.

- [ ] **Step 12: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Vite + React + TypeScript with Tailwind CSS v4 and Vitest"
```

---

### Task 2: Data files

Hardcode all content as typed TypeScript arrays. No UI in this task.

**Files:**
- Create: `src/data/career.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/talks.ts`

- [ ] **Step 1: Create `src/data/career.ts`**

```typescript
export interface CareerEntry {
  title: string;
  company: string;
  dateRange: string; // Format: "Mon YYYY – Mon YYYY" or "Mon YYYY – Present"
  summary: string;
}

export const career: CareerEntry[] = [
  {
    title: 'Senior Software Engineer · Android Tech Lead',
    company: 'Busbud',
    dateRange: 'Feb 2021 – Present',
    summary: 'Built the Android app from scratch. Reached 1k+ bus tickets sold per day. Responsible for CI/CD, QA, roadmap planning, and whitelabel architecture with Kotlin Multiplatform.',
  },
  {
    title: 'Android Tech Lead → Software Engineer Manager, Mobile',
    company: 'Hostelworld',
    dateRange: 'Jun 2018 – Feb 2021',
    summary: 'Started as Android Tech Lead, progressed to managing both Android and iOS mobile teams. Led architecture improvements for testability, set up CI/CD pipelines, and drove a Kotlin Multiplatform pilot project.',
  },
  {
    title: 'Senior Android Developer',
    company: 'WeTek',
    dateRange: 'Sept 2017 – May 2018',
    summary: 'Integrated Google Assistant and Amazon Alexa into WeTek products. Led the WeMote project — a remote control Android app backed by a Node.js REST API.',
  },
  {
    title: 'Android Software Engineer',
    company: 'CashYT',
    dateRange: 'Feb 2016 – Aug 2017',
    summary: 'Built a B2C app from scratch featuring a trivia game, MQTT-based real-time chat, and augmented reality using Vuforia SDK. Led the Porto office Android team.',
  },
  {
    title: 'Android Software Developer',
    company: 'ebankIT / ITSector',
    dateRange: 'Oct 2013 – Jan 2016',
    summary: 'Implemented mobile banking solutions for African and European banks. Worked on-site in Warsaw for Bank Millennium. Architected an Android app skeleton for future banking products.',
  },
  {
    title: 'Research & Development Engineer',
    company: 'INESC Porto — Project MACAW',
    dateRange: 'May 2011 – Jun 2013',
    summary: 'Extended the CALLAS programming language for Wireless Sensor Networks configuration. Built a desktop application for translating visual configurations into CALLAS.',
  },
  {
    title: 'Research & Development Engineer',
    company: 'INESC Porto — Project CALLAS',
    dateRange: 'Jun 2010 – Apr 2011',
    summary: 'Implemented new features and improved virtual machine performance for the CALLAS programming language, designed for Wireless Sensor Networks.',
  },
]
```

- [ ] **Step 2: Create `src/data/projects.ts`**

```typescript
export interface ProjectLink {
  url: string;
  label: string; // e.g. "Play Store", "GitHub", "Server", "App"
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  wip?: boolean;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    name: 'AskMe',
    description:
      'Chat app built with Kotlin Multiplatform targeting Android, iOS, and Desktop. Will evolve to let users authenticate and send direct messages, backed by a custom Spring Boot server with push notification support.',
    tags: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Spring Boot', 'Kotlin'],
    wip: true,
    links: [
      { url: 'https://github.com/ruimendesM/askme-server', label: 'Server' },
      { url: 'https://github.com/ruimendesM/askme-compose-app', label: 'App' },
    ],
  },
  {
    name: 'Busbud Android App',
    description:
      'Built from scratch as the sole Android engineer. Reached 1k+ bus tickets sold per day. Includes CI/CD, full test coverage, and whitelabel support.',
    tags: ['Kotlin', 'Android', 'Jetpack Compose', 'CI/CD'],
    links: [
      {
        url: 'https://play.google.com/store/apps/details?id=com.busbud.android',
        label: 'Play Store',
      },
    ],
  },
  {
    name: 'Hostelworld Android App',
    description:
      'Managed the Android and iOS apps. Led architecture improvements for testability and separation of concerns.',
    tags: ['Kotlin', 'Android', 'iOS'],
    links: [
      {
        url: 'https://play.google.com/store/apps/details?id=com.hostelworld.app',
        label: 'Play Store',
      },
    ],
  },
  {
    name: 'CashYT App',
    description:
      'B2C app built from scratch featuring a trivia game, MQTT-based real-time chat, and augmented reality using Vuforia SDK.',
    tags: ['Kotlin', 'Android', 'RxJava', 'MQTT', 'AR'],
    links: [
      {
        url: 'https://play.google.com/store/apps/details?id=com.cashyt.birdybytes',
        label: 'Play Store',
      },
    ],
  },
  {
    name: 'WeMote',
    description:
      'Remote control Android app for WeTek set-top boxes, backed by a Node.js REST API. Integrated Google Assistant and Amazon Alexa voice commands.',
    tags: ['Kotlin', 'Android', 'Node.js', 'REST API'],
  },
]
```

- [ ] **Step 3: Create `src/data/talks.ts`**

```typescript
export interface Talk {
  title: string;
  event: string;
  date: string; // Format: "Mon YYYY"
  youtubeUrl: string;
}

export const talks: Talk[] = [
  {
    title: 'Actions for Google Assistant',
    event: 'GDG DevFest Porto',
    date: 'Nov 2019',
    youtubeUrl: 'https://www.youtube.com/watch?v=81YEf0vbxns',
  },
  {
    title: 'Databases With Room',
    event: 'GDG Porto Android Sessions',
    date: 'May 2018',
    youtubeUrl: 'https://www.youtube.com/live/tmFjgDQjelA?si=d186jBbV1yOFxFB-&t=1974',
  },
]
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add content data files (career, projects, talks)"
```

---

### Task 3: NavLink and SidebarProfile shared components

**Files:**
- Create: `src/components/NavLink.tsx` + `.test.tsx`
- Create: `src/components/SidebarProfile.tsx` + `.test.tsx`

- [ ] **Step 1: Write the NavLink test**

Create `src/components/NavLink.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavLink from './NavLink'

test('renders nav link with correct text and href', () => {
  render(<NavLink href="#about" label="About" isActive={false} onClick={() => {}} />)
  const link = screen.getByRole('link', { name: 'About' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '#about')
})

test('applies active styles when isActive is true', () => {
  render(<NavLink href="#about" label="About" isActive={true} onClick={() => {}} />)
  const link = screen.getByRole('link', { name: 'About' })
  expect(link).toHaveClass('font-semibold')
})

test('calls onClick when the link is clicked', async () => {
  const onClick = vi.fn()
  render(<NavLink href="#about" label="About" isActive={false} onClick={onClick} />)
  await userEvent.click(screen.getByRole('link', { name: 'About' }))
  expect(onClick).toHaveBeenCalledTimes(1)
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `NavLink` module not found.

- [ ] **Step 3: Implement NavLink**

Create `src/components/NavLink.tsx`:

```typescript
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test
```

Expected: PASS — 3 tests pass.

- [ ] **Step 5: Write the SidebarProfile test**

Create `src/components/SidebarProfile.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import SidebarProfile from './SidebarProfile'

test('renders name and title', () => {
  render(<SidebarProfile />)
  expect(screen.getByText('Rui Mendes')).toBeInTheDocument()
  expect(screen.getByText('Mobile Software Engineer')).toBeInTheDocument()
})

test('renders profile image', () => {
  render(<SidebarProfile />)
  const img = screen.getByRole('img', { name: /rui mendes/i })
  expect(img).toBeInTheDocument()
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `SidebarProfile` module not found.

- [ ] **Step 7: Implement SidebarProfile**

Create `src/components/SidebarProfile.tsx`:

```typescript
export default function SidebarProfile() {
  return (
    <div className="text-center pb-6 border-b border-white/10 mb-4">
      <img
        src="https://github.com/ruimendesM.png"
        alt="Rui Mendes"
        className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
      />
      <p className="text-sm font-bold text-slate-50">Rui Mendes</p>
      <p className="text-xs text-slate-400 mt-0.5">Mobile Software Engineer</p>
    </div>
  )
}
```

- [ ] **Step 8: Run all tests to verify they pass**

```bash
npm test
```

Expected: PASS — 5 tests pass.

- [ ] **Step 9: Commit**

```bash
git add src/components/NavLink.tsx src/components/NavLink.test.tsx
git add src/components/SidebarProfile.tsx src/components/SidebarProfile.test.tsx
git commit -m "feat: add NavLink and SidebarProfile shared components"
```

---

### Task 4: Sidebar component (desktop)

**Files:**
- Create: `src/components/Sidebar.tsx` + `.test.tsx`

- [ ] **Step 1: Write the Sidebar test**

Create `src/components/Sidebar.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar'

test('renders all nav links', () => {
  render(<Sidebar activeSection="about" />)
  expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Career' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Talks' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
})

test('marks active section link', () => {
  render(<Sidebar activeSection="career" />)
  const careerLink = screen.getByRole('link', { name: 'Career' })
  expect(careerLink).toHaveClass('font-semibold')
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `Sidebar` module not found.

- [ ] **Step 3: Implement Sidebar**

Create `src/components/Sidebar.tsx`:

```typescript
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: PASS — all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Sidebar.tsx src/components/Sidebar.test.tsx
git commit -m "feat: add desktop Sidebar component"
```

---

### Task 5: App layout shell

Wire Sidebar into App.tsx with a responsive layout.

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update App.tsx**

Replace `src/App.tsx` with:

```typescript
import { useState } from 'react'
import Sidebar from './components/Sidebar'

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
        <p>Content coming soon…</p>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:5173. Check:
- Dark sidebar on the left with profile photo, nav links, and social links
- "Content coming soon…" on the right
- Resize below 768px: sidebar disappears, hamburger button appears top-left

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add responsive layout shell with sidebar"
```

---

### Task 6: About section

**Files:**
- Create: `src/components/sections/About.tsx` + `.test.tsx`

- [ ] **Step 1: Write the test**

Create `src/components/sections/About.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import About from './About'

test('renders section with id "about"', () => {
  render(<About />)
  expect(document.getElementById('about')).toBeInTheDocument()
})

test('renders greeting and bio text', () => {
  render(<About />)
  expect(screen.getByText(/Hi, I'm Rui/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement About**

Create `src/components/sections/About.tsx`:

```typescript
export default function About() {
  return (
    <section id="about" className="py-12 border-b border-slate-200">
      <h2 className="text-3xl font-bold mb-4 text-slate-900">Hi, I'm Rui 👋</h2>
      <p className="text-base text-slate-500 max-w-xl leading-relaxed">
        Mobile Software Engineer with ~15 years of professional experience, 10 of them focused on
        Android. Currently Android Tech Lead at Busbud. I've worked in both client-side and B2C
        environments, led teams, shaped product roadmaps, and enjoy building things that ship.
      </p>
    </section>
  )
}
```

- [ ] **Step 4: Wire into App.tsx**

```typescript
import About from './components/sections/About'
// inside <main>, replace the placeholder:
<About />
```

- [ ] **Step 5: Run tests and verify in browser**

```bash
npm test
npm run dev
```

Expected: all tests pass; About section visible.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/About.tsx src/components/sections/About.test.tsx src/App.tsx
git commit -m "feat: add About section"
```

---

### Task 7: Career section

**Files:**
- Create: `src/components/sections/CareerItem.tsx`
- Create: `src/components/sections/Career.tsx` + `.test.tsx`

- [ ] **Step 1: Write the test**

Create `src/components/sections/Career.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Career from './Career'

test('renders section with id "career"', () => {
  render(<Career />)
  expect(document.getElementById('career')).toBeInTheDocument()
})

test('renders all career entries', () => {
  render(<Career />)
  expect(screen.getByText('Busbud')).toBeInTheDocument()
  expect(screen.getByText('Hostelworld')).toBeInTheDocument()
  expect(screen.getByText(/INESC Porto/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement CareerItem**

Create `src/components/sections/CareerItem.tsx`:

```typescript
import { CareerEntry } from '../../data/career'

interface Props {
  entry: CareerEntry;
  isLast: boolean;
}

export default function CareerItem({ entry, isLast }: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200 mt-1 min-h-6" />}
      </div>
      <div className="pb-7">
        <p className="text-base font-bold text-slate-900">{entry.title}</p>
        <p className="text-sm text-blue-600 font-semibold mt-0.5">{entry.company}</p>
        <p className="text-xs text-slate-400 mt-0.5">{entry.dateRange}</p>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{entry.summary}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Implement Career**

Create `src/components/sections/Career.tsx`:

```typescript
import { career } from '../../data/career'
import CareerItem from './CareerItem'

export default function Career() {
  return (
    <section id="career" className="py-12 border-b border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-7">Career</h2>
      <div>
        {career.map((entry, index) => (
          <CareerItem
            key={`${entry.company}-${entry.dateRange}`}
            entry={entry}
            isLast={index === career.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Wire into App.tsx**

```typescript
import Career from './components/sections/Career'
// inside <main>, after <About />:
<Career />
```

- [ ] **Step 6: Run tests and verify in browser**

```bash
npm test
npm run dev
```

Expected: all tests pass; timeline with 7 roles visible in browser.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/CareerItem.tsx
git add src/components/sections/Career.tsx src/components/sections/Career.test.tsx
git add src/App.tsx
git commit -m "feat: add Career timeline section"
```

---

### Task 8: Projects section

**Files:**
- Create: `src/components/sections/ProjectCard.tsx`
- Create: `src/components/sections/Projects.tsx` + `.test.tsx`

- [ ] **Step 1: Write the test**

Create `src/components/sections/Projects.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Projects from './Projects'

test('renders section with id "projects"', () => {
  render(<Projects />)
  expect(document.getElementById('projects')).toBeInTheDocument()
})

test('renders all project names', () => {
  render(<Projects />)
  expect(screen.getByText('AskMe')).toBeInTheDocument()
  expect(screen.getByText('Busbud Android App')).toBeInTheDocument()
  expect(screen.getByText('WeMote')).toBeInTheDocument()
})

test('shows WIP badge for AskMe', () => {
  render(<Projects />)
  expect(screen.getByText('Work in Progress')).toBeInTheDocument()
})

test('renders multiple links for AskMe', () => {
  render(<Projects />)
  expect(screen.getByRole('link', { name: /server/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /app/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement ProjectCard**

Create `src/components/sections/ProjectCard.tsx`:

```typescript
import { Project } from '../../data/projects'

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
        {project.wip && (
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
            Work in Progress
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 border border-blue-200 px-2.5 py-1 rounded no-underline hover:bg-blue-50 transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Implement Projects**

Create `src/components/sections/Projects.tsx`:

```typescript
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="py-12 border-b border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Wire into App.tsx**

```typescript
import Projects from './components/sections/Projects'
// inside <main>, after <Career />:
<Projects />
```

- [ ] **Step 6: Run tests and verify in browser**

```bash
npm test
npm run dev
```

Expected: all tests pass; project cards in 2-column grid with WIP badge and two links on AskMe.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/ProjectCard.tsx
git add src/components/sections/Projects.tsx src/components/sections/Projects.test.tsx
git add src/App.tsx
git commit -m "feat: add Projects section with cards"
```

---

### Task 9: Talks section

**Files:**
- Create: `src/components/sections/TalkCard.tsx`
- Create: `src/components/sections/Talks.tsx` + `.test.tsx`

- [ ] **Step 1: Write the test**

Create `src/components/sections/Talks.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Talks from './Talks'

test('renders section with id "talks"', () => {
  render(<Talks />)
  expect(document.getElementById('talks')).toBeInTheDocument()
})

test('renders all talk titles', () => {
  render(<Talks />)
  expect(screen.getByText('Actions for Google Assistant')).toBeInTheDocument()
  expect(screen.getByText('Databases With Room')).toBeInTheDocument()
})

test('renders YouTube watch links', () => {
  render(<Talks />)
  const links = screen.getAllByRole('link', { name: /watch/i })
  expect(links.length).toBe(2)
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement TalkCard**

Create `src/components/sections/TalkCard.tsx`:

```typescript
import { Talk } from '../../data/talks'

interface Props {
  talk: Talk;
}

export default function TalkCard({ talk }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 border border-slate-200 rounded-xl bg-white">
      <div className="flex-1">
        <h3 className="text-base font-bold text-slate-900">{talk.title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{talk.event} · {talk.date}</p>
      </div>
      <a
        href={talk.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${talk.title}`}
        className="flex-shrink-0 text-sm text-red-500 border border-red-200 px-3 py-1 rounded no-underline font-semibold hover:bg-red-50 transition-colors"
      >
        ▶ Watch
      </a>
    </div>
  )
}
```

- [ ] **Step 4: Implement Talks**

Create `src/components/sections/Talks.tsx`:

```typescript
import { talks } from '../../data/talks'
import TalkCard from './TalkCard'

export default function Talks() {
  return (
    <section id="talks" className="py-12 border-b border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Talks</h2>
      <div className="flex flex-col gap-3">
        {talks.map((talk) => (
          <TalkCard key={talk.youtubeUrl} talk={talk} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Wire into App.tsx**

```typescript
import Talks from './components/sections/Talks'
// inside <main>, after <Projects />:
<Talks />
```

- [ ] **Step 6: Run tests and verify in browser**

```bash
npm test
npm run dev
```

Expected: all tests pass; two talk cards with red "Watch" links.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/TalkCard.tsx
git add src/components/sections/Talks.tsx src/components/sections/Talks.test.tsx
git add src/App.tsx
git commit -m "feat: add Talks section"
```

---

### Task 10: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx` + `.test.tsx`

- [ ] **Step 1: Write the test**

Create `src/components/sections/Contact.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Contact from './Contact'

test('renders section with id "contact"', () => {
  render(<Contact />)
  expect(document.getElementById('contact')).toBeInTheDocument()
})

test('renders email link', () => {
  render(<Contact />)
  const emailLink = screen.getByRole('link', { name: /ruimigfmendes/i })
  expect(emailLink).toHaveAttribute('href', 'mailto:ruimigfmendes+dev@gmail.com')
})

test('renders LinkedIn and GitHub links', () => {
  render(<Contact />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL.

- [ ] **Step 3: Implement Contact**

Create `src/components/sections/Contact.tsx`:

```typescript
export default function Contact() {
  return (
    <section id="contact" className="py-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-3">Contact</h2>
      <p className="text-sm text-slate-500 mb-4">Want to get in touch? Reach me here:</p>
      <div className="flex flex-wrap gap-3">
        <a
          href="mailto:ruimigfmendes+dev@gmail.com"
          className="text-sm no-underline text-slate-900 border border-slate-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-colors"
        >
          ✉ ruimigfmendes+dev@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/rui-mendes-2482465b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm no-underline text-slate-900 border border-slate-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/ruimendesM"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm no-underline text-slate-900 border border-slate-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-colors"
        >
          GitHub
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Wire into App.tsx**

```typescript
import Contact from './components/sections/Contact'
// inside <main>, after <Talks />:
<Contact />
```

- [ ] **Step 5: Run tests and verify in browser**

```bash
npm test
npm run dev
```

Expected: all tests pass; all five sections visible top-to-bottom.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/sections/Contact.test.tsx
git add src/App.tsx
git commit -m "feat: add Contact section — all sections complete"
```

---

### Task 11: Drawer (mobile navigation)

**Files:**
- Create: `src/components/Drawer.tsx` + `.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the Drawer test**

Create `src/components/Drawer.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Drawer from './Drawer'

test('renders nav links when open', () => {
  render(<Drawer isOpen={true} onClose={() => {}} activeSection="about" />)
  expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Career' })).toBeInTheDocument()
})

test('calls onClose when backdrop is clicked', async () => {
  const onClose = vi.fn()
  render(<Drawer isOpen={true} onClose={onClose} activeSection="about" />)
  await userEvent.click(screen.getByTestId('drawer-backdrop'))
  expect(onClose).toHaveBeenCalled()
})

test('marks the active section link', () => {
  render(<Drawer isOpen={true} onClose={() => {}} activeSection="projects" />)
  const projectsLink = screen.getByRole('link', { name: 'Projects' })
  expect(projectsLink).toHaveClass('font-semibold')
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `Drawer` module not found.

- [ ] **Step 3: Implement Drawer**

Create `src/components/Drawer.tsx`:

```typescript
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
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export default function Drawer({ isOpen, onClose, activeSection }: Props) {
  return (
    <>
      <div
        data-testid="drawer-backdrop"
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        className={`fixed top-0 left-0 h-screen w-56 bg-slate-900 text-slate-50 z-[201] p-6 flex flex-col gap-1 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarProfile />
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={activeSection === item.href.slice(1)}
              onClick={onClose}
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
      </div>
    </>
  )
}
```

- [ ] **Step 4: Wire Drawer into App.tsx**

```typescript
import Drawer from './components/Drawer'

// inside the layout div, after the hamburger button:
<Drawer
  isOpen={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  activeSection={activeSection}
/>
```

- [ ] **Step 5: Run tests and verify on mobile**

```bash
npm test
npm run dev
```

Resize browser below 768px. Expected:
- Hamburger button visible top-left
- Tapping it opens the drawer from the left with a slide animation
- Tapping the backdrop or a nav link closes the drawer

- [ ] **Step 6: Commit**

```bash
git add src/components/Drawer.tsx src/components/Drawer.test.tsx
git add src/App.tsx
git commit -m "feat: add mobile slide-in Drawer"
```

---

### Task 12: Scroll-spy

Wire up `IntersectionObserver` so the active nav link updates as the user scrolls.

**Files:**
- Create: `src/hooks/useScrollSpy.ts` + `.test.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the scroll-spy hook test**

Create `src/hooks/useScrollSpy.test.ts`:

```typescript
import { renderHook } from '@testing-library/react'
import { useScrollSpy } from './useScrollSpy'

test('returns the first section id as the default active section', () => {
  const ids = ['about', 'career', 'projects']
  ids.forEach((id) => {
    const el = document.createElement('section')
    el.id = id
    document.body.appendChild(el)
  })

  const { result } = renderHook(() => useScrollSpy(ids))
  expect(result.current).toBe('about')

  ids.forEach((id) => document.getElementById(id)?.remove())
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `useScrollSpy` module not found.

- [ ] **Step 3: Implement useScrollSpy**

Create `src/hooks/useScrollSpy.ts`:

```typescript
import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -40% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [ids])

  return activeId
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: PASS — all tests pass.

- [ ] **Step 5: Wire useScrollSpy into App.tsx**

Replace the `activeSection` useState with the hook. The final `App.tsx`:

```typescript
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeSection = useScrollSpy(SECTION_IDS)

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
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSection={activeSection}
      />
      <main className="flex-1 px-10 py-8 max-w-[860px] pt-20 md:pt-8">
        <About />
        <Career />
        <Projects />
        <Talks />
        <Contact />
      </main>
    </div>
  )
}
```

- [ ] **Step 6: Verify scroll-spy in browser**

```bash
npm run dev
```

Scroll slowly through the page. The active nav link in the sidebar should update as each section enters view. If a tall section (Career) doesn't update reliably, change `rootMargin` in `useScrollSpy.ts` from `'-40% 0px -40% 0px'` to `'-20% 0px -20% 0px'` and re-test.

- [ ] **Step 7: Run all tests one final time**

```bash
npm test
```

Expected: all tests pass with no failures.

- [ ] **Step 8: Commit**

```bash
git add src/hooks/useScrollSpy.ts src/hooks/useScrollSpy.test.ts
git add src/App.tsx
git commit -m "feat: add scroll-spy with IntersectionObserver"
```

---

## Done

The site is fully built. Run `npm run dev` to verify end-to-end:
- Desktop: sidebar with scroll-spy, all 5 sections scrollable
- Mobile: hamburger opens slide-in drawer, all nav links work

**To deploy to Vercel:**
1. Push the repo to GitHub
2. Go to vercel.com, import the repo
3. Vercel auto-detects Vite — no configuration needed
4. Every push to `main` auto-deploys
