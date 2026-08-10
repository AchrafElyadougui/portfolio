# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This repo currently contains a single app: `frontend/`, a personal portfolio site. All commands below are run from `frontend/`.

## Commands

```bash
cd frontend
npm install     # install dependencies
npm run dev     # start Vite dev server with HMR
npm run build   # production build to frontend/dist
npm run preview # preview the production build locally
npm run lint    # run ESLint over the project
```

There is no test runner configured in this project (no test script, no test framework installed).

## Architecture

- **Stack**: React 19 + Vite 6 (SWC plugin for Fast Refresh) + Tailwind CSS v4 (via `@tailwindcss/vite`, not a `tailwind.config.js`) + `react-router-dom` v7.
- **Entry chain**: `src/main.jsx` → `src/App.jsx` → `src/routes/index.jsx` (a `createBrowserRouter` config) → `src/layouts/Layout.jsx` (wraps every route with `Navbar`, `ScrollToTop`, `Footer` via `<Outlet />`) → page in `src/pages/`.
- **Routing**: all routes are defined in one place, `src/routes/index.jsx`. Add new pages there and in `src/pages/`. Note some inconsistencies to be aware of when editing: paths are declared with mixed casing (`/Home`, `/Blog` alongside `/`, `/projects`, `/contact`), and `errorElement` is `NotFound` (not a route-specific 404).
- **Theming**: dark/light mode is a hand-rolled toggle, not a Tailwind `dark:` class strategy config. `SettingsModal.jsx` writes `"light"`/`"dark"` to `localStorage["theme"]` and toggles a `.dark` class on `document.documentElement`; `App.jsx` re-applies the stored theme on mount. All colors are CSS custom properties defined in `src/index.css` under `:root` (light) and `.dark` (dark) — e.g. `var(--color-background)`, `var(--color-text)`, `var(--color-nav-hover)`. Use these variables (via arbitrary-value Tailwind classes like `bg-[var(--color-background)]`) rather than hardcoded Tailwind color classes when styling.
- **Content is hardcoded in components**: there is no CMS or data layer. Project listings live as an array literal in `src/components/ProjectsSection.jsx` (`ProjectsSection` accepts a `count` prop to limit how many show, used on the Home page vs. the full projects page). The tech-stack icon list on the Home page is a similar array literal in `src/pages/Home.jsx`. Images/icons are imported directly from `src/assets/`.
- **Icons**: both `lucide-react` and `@heroicons/react` are used across components — check existing imports in a file before adding a new icon dependency.
