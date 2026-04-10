# Sri's UX Portfolio

A clean, modern portfolio website built with React, Vite, and custom CSS. Showcasing UX case studies, experimental projects, and design philosophy.

## 🎯 Features

- **13 Pages** — Home, Work (3 case studies), Play (5 projects), Community, About, + 404
- **Responsive Design** — Mobile-first, works on all devices
- **Smooth Interactions** — Hover effects, scroll-to-top, fade transitions
- **Optimized Assets** — AVIF & WebP images, MP4 video for play projects, lazy-loaded mascot
- **Fast Build** — Vite + React for instant HMR during development

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/tcs-portfolio.git
cd tcs-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Dev server runs at `http://localhost:5173`

### Build

```bash
npm run build
```

Production build goes to `dist/` folder.

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer, PageShell, CaseStudyLayout
│   └── ui/             # Button, ProjectCard, ProfilePhoto, etc.
├── pages/              # Home, Work, Play, Community, About, NotFound
│   ├── work/           # 3 case study detail pages
│   └── play/           # 5 project detail pages
├── sections/           # Hero, FeaturedProjects, PlayPreview, etc.
├── data/               # projects.js, play.js, community.js
├── assets/             # Images (AVIF, WebP) and play project MP4s
├── styles/             # tokens.css, utilities.css
├── App.jsx             # Router configuration
├── main.jsx            # Entry point
└── index.css           # Global styles + design tokens
```

## 🎨 Styling

- **Design Tokens** — Colors, typography, spacing in `src/styles/tokens.css`
- **CSS Custom Properties** — All colors, sizes defined as CSS variables
- **Tailwind CSS** — Utility-first framework for rapid prototyping (optional)
- **Responsive** — Mobile breakpoint at 720px

## 🔗 Pages & Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/work` | Work projects grid |
| `/work/microsoft` | Microsoft Azure case study |
| `/work/ai-coding` | AI Coding Interviewer case study |
| `/work/strabospot` | StraboSpot GIS case study |
| `/play` | Play projects grid |
| `/play/vr-interior` | VR Interior Design project |
| `/play/heart-of-insomnia` | Heart of Insomnia project |
| `/play/butterfly` | Butterfly Feeder project |
| `/play/branding` | Branding Projects project |
| `/play/digital-confetti` | Digital Confetti project |
| `/community` | Newsletter & AMA |
| `/about` | Bio & philosophy |
| `*` | 404 Not Found |

## 📦 Tech Stack

- **React 19** — UI library
- **React Router 7** — Client-side routing
- **Vite 8** — Build tool & dev server
- **Tailwind CSS 4** — Utility CSS framework
- **CSS Variables** — Design tokens & theming
- **ESLint 9** — Code quality

## 🚀 Deployment

### GitHub Pages

```bash
# Build production
npm run build

# Push to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

Then enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch.

### Custom Domain

Add CNAME record at your domain registrar pointing to GitHub Pages servers, then configure in repo Settings → Pages → Custom domain.

## 📝 Content

All portfolio content lives in:
- `src/data/projects.js` — Work case studies
- `src/data/play.js` — Play projects
- `src/data/community.js` — Newsletter info

Edit these files to update project descriptions, outcomes, tools, etc.

## 🖼️ Images

Images stored in `src/assets/`:
- `profile.avif` — Profile photo (static)
- `profile(animated).webp` — Profile photo (animated, hover effect)
- `work-*.avif` — Work project images
- `play-*.mp4` + `play-*.jpg` — Play project videos with poster images

## ✅ Quality Checks

```bash
# Lint check
npm run lint

# Production build preview
npm run preview
```

## 📄 License

This portfolio is personal work. All design and code © Srinidhi Chaturvedi.

---

**Questions?** Reach out at srinidhi.saas@gmail.com
