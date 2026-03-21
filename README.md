# ruimendes.dev

Personal website.

## Stack

| Concern | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Testing | Vitest 4 + React Testing Library |

## Architecture

Single-page app with anchor-based navigation and no client-side router. All content is hardcoded in `src/data/` — no CMS, no API (except the GitHub avatar and devicon CDN logos).

```
src/
  components/
    Sidebar.tsx          # Fixed left sidebar (desktop ≥768px)
    Drawer.tsx           # Slide-in navigation drawer (mobile <768px)
    SidebarProfile.tsx   # Shared: avatar + name + title
    NavLink.tsx          # Shared nav link with optional Lucide icon
    ThemeToggle.tsx      # Dark/light mode toggle button
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
    projects.ts          # Project cards (with icons and tech stack)
    talks.ts             # Conference talk entries
    navigation.ts        # Shared nav section list (with Lucide icons)
  assets/
    icons/               # App icons for project cards (Vite-imported)
```

**Layout:** fixed sidebar on the left (desktop), hamburger + slide-in drawer on mobile. Content is centred at 860px max-width on large screens. The active nav link updates automatically as you scroll via `IntersectionObserver`.

**Theme:** dark and light mode, toggled via a button in the sidebar/drawer. The user's preference is persisted in `localStorage`. A pre-React inline script in `index.html` applies the correct theme class before first paint to prevent flash.

**Styling:** Tailwind CSS v4 utility classes in JSX only — no separate CSS files, no `tailwind.config.js`. Dark mode uses `@custom-variant dark` with a `.dark` class on `<html>`.

## Development

```bash
npm install
npm run dev      # Start dev server at localhost:5173
npm test         # Run tests
npm run build    # Production build → dist/
```

## Deployment

Built as a static site (`dist/`). Served via Nginx on a Hetzner VPS. Deployments are automated via GitHub Actions on push to `main`.
