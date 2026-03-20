# Personal Website — Design Spec

**Date:** 2026-03-20
**Stack:** Vite + React + TypeScript
**URL:** ruimendes.dev (personal site for Rui Mendes)

---

## Overview

A single-page personal website for Rui Mendes, a Mobile Software Engineer with ~15 years of experience. The audience is general/mixed — recruiters, peers, and anyone who finds the link. The site presents who Rui is, his career history, curated projects, conference talks, and contact details.

---

## Layout & Navigation

### Desktop
- **Fixed left sidebar** (~160–200px wide) containing:
  - Profile photo (sourced from `https://github.com/ruimendesM.png`)
  - Name and title
  - Navigation links: About, Career, Projects, Talks, Contact
  - Social links at the bottom: GitHub, LinkedIn
- **Main content area** to the right, scrollable
- Active section is highlighted in the sidebar as the user scrolls (scroll-spy — see Behaviour)

### Mobile (below 768px)
- Sidebar is hidden
- A **hamburger icon button** is rendered by `App.tsx` in the top-left corner of the screen
- Tapping it opens a **slide-in drawer** from the left (see Behaviour)
- The drawer contains the same nav links, profile photo, name, and social links as the desktop sidebar
- Tapping a nav link or the backdrop overlay closes the drawer and scrolls to the section

---

## Sections

All sections live on a single scrollable page in this order. Each section's outermost element must carry the `id` listed below — nav links scroll to these anchors.

| Section | `id` | Nav label |
|---|---|---|
| About | `about` | About |
| Career | `career` | Career |
| Projects | `projects` | Projects |
| Talks | `talks` | Talks |
| Contact | `contact` | Contact |

### 1. About
- Greeting + short bio paragraph
- Content derived from CV summary:
  > "Mobile Software Engineer with ~15 years of professional experience, 10 of them focused on Android. Currently Android Tech Lead at Busbud. I've worked in both client-side and B2C environments, led teams, shaped product roadmaps, and enjoy building things that ship."

### 2. Career
- Vertical timeline, most recent first
- Each entry includes: job title, company name, date range, 1–2 line summary
- All roles from CV:
  1. Senior Software Engineer / Android Tech Lead — Busbud (Feb 2021 – Present)
  2. Android Tech Lead → Software Engineer Manager, Mobile — Hostelworld (Jun 2018 – Feb 2021)
  3. Senior Android Developer — WeTek (Sept 2017 – May 2018)
  5. Android Software Engineer — CashYT (Feb 2016 – Aug 2017)
  6. Android Software Developer — ebankIT / ITSector (Oct 2013 – Jan 2016)
  7. R&D Engineer — INESC Porto, Project MACAW (May 2011 – Jun 2013)
  8. R&D Engineer — INESC Porto, Project CALLAS (Jun 2010 – Apr 2011)

### 3. Projects
- 2-column card grid (1-column on mobile)
- Each card contains: project name, short description, tech stack tags (pills), and zero or more links
- Manually curated list (not auto-fetched from GitHub). Initial projects:
  1. **AskMe** *(Work in Progress)* — Chat app built with Kotlin Multiplatform targeting Android, iOS, and Desktop. Currently a generic chat app; will evolve to allow users to authenticate and send direct messages to Rui via his own server, with push notification support.
     - Server (Spring Boot / Kotlin): `https://github.com/ruimendesM/askme-server`
     - App (Compose Multiplatform / Kotlin): `https://github.com/ruimendesM/askme-compose-app`
  2. **Busbud Android App** — Built from scratch; reached 1k+ bus tickets/day. [Play Store]
  3. **Hostelworld Android App** — Android + iOS team management. [Play Store]
  4. **CashYT App** — B2C trivia/AR app built from scratch. [Play Store]
  5. **WeMote (WeTek)** — Remote control app for set-top boxes + REST API in Node.js. [no link]

### 4. Talks
- List of conference/community talk appearances
- Each entry contains: talk title, event name, date, and a YouTube link
- Displayed as a simple vertical list of cards (not a grid — the list is short)
- Initial talks:
  1. **Databases With Room** — GDG Porto Android Sessions, May 2018. [YouTube](https://www.youtube.com/live/tmFjgDQjelA?si=d186jBbV1yOFxFB-&t=1974)
  2. **Actions for Google Assistant** — GDG DevFest Porto, 2019. [YouTube](https://www.youtube.com/watch?v=81YEf0vbxns)

### 5. Contact
- Short "get in touch" message
- Links/icons for:
  - Email: `ruimigfmendes+dev@gmail.com`
  - LinkedIn: `https://www.linkedin.com/in/rui-mendes-2482465b/`
  - GitHub: `https://github.com/ruimendesM`

---

## Component Structure

```
src/
  components/
    Sidebar.tsx          # Desktop sidebar — composes NavLink + SidebarProfile + social links
    Drawer.tsx           # Mobile slide-in drawer — composes NavLink + SidebarProfile + social links independently (does NOT wrap Sidebar)
    SidebarProfile.tsx   # Shared: profile photo + name + title (used by both Sidebar and Drawer)
    NavLink.tsx          # Shared nav link used by both Sidebar and Drawer
    sections/
      About.tsx
      Career.tsx
      CareerItem.tsx     # Single timeline entry
      Projects.tsx
      ProjectCard.tsx    # Single project card
      Talks.tsx
      TalkCard.tsx       # Single talk entry
      Contact.tsx
  App.tsx                # Root: manages activeSection state, drawerOpen state; renders Sidebar + hamburger button + Drawer + main content
  main.tsx               # Vite entry point
  data/
    career.ts            # Typed array of career entries
    projects.ts          # Typed array of project entries
    talks.ts             # Typed array of talk entries
```

**Note on Sidebar vs Drawer:** `Drawer.tsx` does not wrap or import `Sidebar.tsx`. Both compose independently from the same shared primitives (`NavLink`, `SidebarProfile`, social links). This avoids CSS layout conflicts.

---

## Data Model

```typescript
// data/career.ts
interface CareerEntry {
  title: string;
  company: string;
  dateRange: string; // Format: "Mon YYYY – Mon YYYY" or "Mon YYYY – Present"
  summary: string;
}

// data/projects.ts
interface ProjectLink {
  url: string;
  label: string; // e.g. "Play Store", "GitHub", "Server", "App"
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  wip?: boolean;          // renders a "Work in Progress" badge on the card
  links?: ProjectLink[];  // zero or more links (supports projects with multiple repos)
}

// data/talks.ts
interface Talk {
  title: string;
  event: string;
  date: string; // Format: "Mon YYYY"
  youtubeUrl: string;
}
```

Content is hardcoded in `data/` files — no CMS, no API calls (except the GitHub avatar image URL).

---

## Behaviour

### Scroll-spy
Active section tracking uses `IntersectionObserver` on each section element with a `rootMargin` of `-40% 0px -40% 0px` (fires when the section is in the middle 20% of the viewport). `App.tsx` holds `activeSection: string` in state and passes it as a prop to both `Sidebar` and `Drawer`. The active nav link renders with a highlighted style class. **Note:** the exact `rootMargin` value should be tested empirically during implementation — sections taller than 20% of the viewport may not trigger correctly. Adjust to `-20% 0px -20% 0px` or similar if needed.

### Smooth scroll
Nav links use `href="#about"` etc. CSS `scroll-behavior: smooth` on `html` handles the animation — no JavaScript needed.

### Slide-in drawer (mobile)
- `App.tsx` holds `drawerOpen: boolean` in state
- Hamburger button (rendered by `App.tsx`, visible only on mobile via CSS) calls `setDrawerOpen(true)`
- `Drawer` receives `isOpen` and `onClose` props
- Animation: CSS `transform: translateX(-100%)` → `translateX(0)` with `transition: transform 300ms ease`
- A semi-transparent backdrop overlay is rendered alongside the drawer; clicking it calls `onClose`
- Clicking a nav link inside the drawer calls `onClose` and scrolls to the section simultaneously — the CSS drawer transition runs independently and does not block the scroll

### Responsive breakpoint
- `≥ 768px`: sidebar visible, hamburger hidden
- `< 768px`: sidebar hidden, hamburger visible, drawer available

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (utility classes in JSX, no separate CSS files) |
| Deployment | Vercel — run `npm run build`, connect the GitHub repo, no extra config needed |

No UI component library — plain HTML elements styled with Tailwind utility classes. Design can be improved later without changing the component structure.

---

## Out of Scope (for now)

- Visual design (colour palette, typography) — will be iterated after initial structure is built
- Blog / writing section
- Dark mode toggle
- Animations beyond smooth scroll and drawer slide
- Contact form (email link is sufficient)
- Fetching GitHub repos dynamically
- Analytics
