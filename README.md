# ruimendes.dev

Personal website for Rui Mendes — a single-page site covering About, Career, Projects, Talks, and Contact.

## Stack

| Concern | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Testing | Vitest 4 + React Testing Library |

## Architecture

Single-page app with anchor-based navigation and no client-side router. All content is hardcoded in `src/data/` — no CMS, no API (except the GitHub avatar).

```
src/
  components/
    Sidebar.tsx          # Fixed left sidebar (desktop ≥768px)
    Drawer.tsx           # Slide-in navigation drawer (mobile <768px)
    SidebarProfile.tsx   # Shared: avatar + name + title
    NavLink.tsx          # Shared nav link used by Sidebar and Drawer
    sections/
      About.tsx
      Career.tsx / CareerItem.tsx
      Projects.tsx / ProjectCard.tsx
      Talks.tsx / TalkCard.tsx
      Contact.tsx
  hooks/
    useScrollSpy.ts      # IntersectionObserver-based active section tracking
  data/
    career.ts            # Career timeline entries
    projects.ts          # Project cards
    talks.ts             # Conference talk entries
    navigation.ts        # Shared nav section list
```

**Layout:** fixed sidebar on the left (desktop), hamburger + slide-in drawer on mobile. The active nav link updates automatically as you scroll via `IntersectionObserver`.

**Styling:** Tailwind CSS v4 utility classes in JSX only — no separate CSS files, no `tailwind.config.js`.

## Development

```bash
npm install
npm run dev      # Start dev server at localhost:5173
npm test         # Run tests
npm run build    # Production build → dist/
```

## Deployment

Built as a static site (`dist/`). Served via Nginx on a Hetzner VPS. Deployments are automated via GitHub Actions on push to `main`.
