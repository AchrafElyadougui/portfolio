# Achraf El Yadougui — Portfolio (V2)

An editorial, artistic-direction portfolio built with React, Vite and Tailwind
CSS — a "digital gallery" treatment rather than a standard SaaS-template
layout. Lives alongside the original `frontend/` app without modifying it.

## Overview

The site is a single scrolling page with anchor-linked, numbered sections
(`01 — About` through `07 — Contact`). Navigation is a minimal top bar plus a
fullscreen editorial menu overlay with large stacked links. Scrolling is
inertial (Lenis), typography does most of the visual work (Space Grotesk
display type, Space Mono for labels/metadata), and the single accent color is
a deliberately distinctive acid lime rather than the generic SaaS blue.

All content (experience, education, projects, skills) is sourced from the
owner's actual CV and the existing `frontend/` project — nothing is invented.
Where information wasn't available (e.g. no public repo link, no project
screenshot), the UI represents that honestly (an image-less project panel
with a placeholder icon, "no public repository or live demo" instead of a
dead link) rather than fabricating it.

## Features

- **Massive editorial typography** as the primary design element (Hero name,
  section titles, Contact closing line), built on a word-mask reveal
  component (`RevealText`) rather than plain fades
- **Fullscreen animated menu** (`Navbar`) with numbered links and a live
  section indicator in the top bar, driven by an IntersectionObserver
  scroll-spy (`useActiveSection`)
- **Custom cursor** (`CustomCursor`) that morphs into contextual labels
  (`VIEW`, `OPEN`, `SEND`, `GO`) over interactive elements — automatically
  disabled on touch devices and when `prefers-reduced-motion` is set
  (`useFinePointer`)
- **Magnetic buttons** (`MagneticButton`) that pull toward the cursor on
  hover — transform-only, so it stays cheap
- **Large editorial project panels** (not a card grid) with alternating
  image/text layout, project numbering, and hover-driven image scale
- **Typographic tech-stack composition** — technologies rendered as a
  size-varied flowing list per category instead of a badge grid
- Scroll progress bar; sticky navbar with scroll-based background/blur
  (hysteresis-protected against flicker on load)
- Fully validated contact form (client-side) that's honest about not being
  wired to a backend yet, rather than faking a "message sent" state
- Static film-grain texture overlay (`.grain-overlay`) — a single background
  image, no animation cost
- Dark theme only, built entirely on CSS custom properties
- `prefers-reduced-motion` respected globally (`MotionConfig reducedMotion="user"`,
  Lenis skipped entirely, custom cursor/floating decoration disabled)
- Images converted to WebP and sized for how they're actually displayed
  (the source portrait photo was 1920×1080/3.6MB; the site ships an
  800×1000/~72KB crop)

## Tech Stack

- **React 19** + **Vite 6** (SWC plugin for Fast Refresh)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, no `tailwind.config.js`)
- **Framer Motion** for animation
- **Lenis** for smooth scrolling
- **lucide-react** for icons
- Plain JavaScript (matches the existing `frontend/` project)

No router is used — this is intentionally a single page, so `react-router-dom`
would be unnecessary weight.

## Project Structure

```text
frontend-v2/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/            # portrait photo + project screenshots (WebP)
│   ├── components/
│   │   ├── common/        # RevealText, SectionHeading, Container, MagneticButton
│   │   ├── Navbar/         # top bar + fullscreen editorial menu
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Experience/
│   │   ├── Projects/      # ProjectCard.jsx renders the large editorial panel
│   │   ├── Skills/
│   │   ├── Education/
│   │   ├── Services/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── CustomCursor.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── SmoothScroll.jsx
│   ├── data/               # experience.js, education.js, projects.js,
│   │                        # skills.js, services.js, social.js, navigation.js
│   ├── hooks/
│   │   ├── useActiveSection.js   # IntersectionObserver-based scroll-spy
│   │   └── useFinePointer.js     # detects mouse-capable, motion-OK devices
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── lib/
│   │   └── motion.js       # shared Framer Motion variants
│   ├── pages/
│   │   └── Home.jsx        # composes all sections
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # design tokens, fonts, grain texture, cursor rules
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

All page content is data-driven — editing a job, a project, or a skill means
editing the corresponding file in `src/data/`, not hunting through JSX.

## Installation & Development

```bash
cd frontend-v2
npm install
npm run dev       # start Vite dev server with HMR
npm run build     # production build to frontend-v2/dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint over the project
```

There is no test runner configured (matches the existing `frontend/` project).

## Screenshots

_Add screenshots of the Hero, Projects, and Experience sections here once the
site is deployed._

## Live Demo

_Not deployed yet — add the production URL here once it's live._

## Known Gaps / Next Steps

- **Contact form backend**: the form validates client-side but isn't wired to
  an email service. The repo already contains a Spring Boot backend
  (`backend/`) with a mail service that could power this — connecting it is
  the natural next step.
- **Project screenshots**: the "Digitalisation des courriers administratifs"
  project panel is intentionally image-less (no screenshot was available).
  Swap in a real screenshot via `src/data/projects.js` when one exists.
- **CV/résumé file**: there's currently no downloadable CV; add one and wire
  it up if wanted.
- **Light mode**: not implemented — this redesign is intentionally dark-only
  per the art direction (deep background, off-white type, one accent). A
  light theme would need a new palette pass, not just a CSS variable swap.

## Author

**Achraf El Yadougui**
Full Stack Developer | Java · Spring Boot · React · IT Support
[GitHub](https://github.com/AchrafElyadougui) ·
[LinkedIn](https://www.linkedin.com/in/el-yadougui-achraf)

## License

Personal project — all rights reserved.
