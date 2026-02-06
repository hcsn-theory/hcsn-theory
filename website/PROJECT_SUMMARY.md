# HCSN Theory Website — Complete Project Summary

## Overview

A professional, research-focused website for **Hierarchical Causal Structure Networks (HCSN) Theory** built with modern web technologies.

**Stack:** Next.js 14 + TypeScript + Tailwind CSS  
**Status:** Ready for development and deployment  
**Philosophy:** Academic credibility with startup-level polish, zero hype

---

## Project Structure

```
website/
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                # Root layout (navbar, footer, metadata)
│   ├── page.tsx                  # Home page (hero, core ideas, figures, roadmap)
│   ├── about/page.tsx            # About project (philosophy, motivation)
│   ├── docs/page.tsx             # Documentation (glossary, key concepts)
│   ├── figures/page.tsx          # Figures gallery (placeholders)
│   ├── roadmap/page.tsx          # Roadmap (milestones, future directions)
│   └── contact/page.tsx          # Contact (email, GitHub, FAQ)
│
├── components/                   # Reusable UI components
│   ├── Navbar.tsx               # Top navigation bar
│   ├── Footer.tsx               # Footer with links and copyright
│   ├── Card.tsx                 # Reusable card component
│   ├── Badge.tsx                # Status badges (Stable/Empirical/In Progress)
│   ├── Section.tsx              # Section wrapper with title
│   └── index.ts                 # Component exports
│
├── config/
│   └── site.ts                  # Centralized site config & metadata
│
├── styles/
│   └── globals.css              # Global Tailwind styles & typography
│
├── types/
│   └── index.ts                 # TypeScript interfaces
│
├── public/                      # Static assets (to be created)
│
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind theme & configuration
├── postcss.config.js            # PostCSS (Tailwind processor)
├── next.config.js               # Next.js build configuration
├── .gitignore                   # Git ignore file
├── README.md                    # Project README
├── SETUP.md                     # Quick start guide
├── DEVELOPMENT.md               # Development notes
└── PROJECT_SUMMARY.md           # This file
```

---

## Pages & Features

### Home Page (`/`)
- **Hero section** with project title, subtitle, disclaimer
- **About the Project** cards (simulation-first, minimal axioms, emergence, no external claims)
- **Core Ideas** grid (6 key concepts)
- **Documentation** preview (4 canonical documents with status badges)
- **Figures** gallery teaser (6 placeholders)
- **Roadmap** preview (5 phases)
- **CTA section** (Get Involved)

### About Page (`/about`)
- **Motivation**: Why discrete causal networks?
- **Core Philosophy**: 4-card grid (minimal assumptions, simulation-driven, operational definitions, emergence)
- **Why This Work Exists**: Explanatory text
- **How Simulations Guide Theory**: 5-step process diagram
- **Current Status**: List of validated results

### Documentation Page (`/docs`)
- **Documentation Table**: 4 canonical documents with status badges
- **Reading Guides**: Sequential vs quick-start paths
- **Glossary**: 8 key concepts with definitions
- **Archive Notice**: Info about earlier superseded documents

### Figures Page (`/figures`)
- **Figure Grid**: 6 placeholders (phase diagram, lifetimes, imbalance, scattering, hypergraph, scaling)
- **About Figures Section**: Explanation of simulation evidence
- **Future Expansion**: Planned visualizations

### Roadmap Page (`/roadmap`)
- **Timeline**: All 5 phases with status badges
- **Completed Milestones**: 4 cards detailing Phases 1–16
- **Current Focus**: Phase 17+ (dimensional selection & scaling)
- **Future Directions**: 6 research areas
- **Contribute Section**: How to get involved

### Contact Page (`/contact`)
- **Email & GitHub**: Direct contact information
- **How We Collaborate**: Discussion guidelines, what we're open to, what we're NOT claiming
- **FAQ**: 6 common questions with answers
- **Newsletter**: Email subscription form

---

## Key Design Decisions

### Color Palette
- **Neutral grays**: Professional, calm aesthetic
- **Light backgrounds**: White and neutral-50
- **Text**: Neutral-900 (dark) on light, white on dark
- **Accents**: Subtle blue for links, green/blue/amber/gray for badges

### Typography
- **Headings**: Bold, tracked, size-based hierarchy
- **Body text**: 1.125rem (18px) with 1.5 line height for readability
- **Code/mono**: Font-mono where needed

### Components
- **Cards**: Rounded borders, subtle shadow, hover effect
- **Badges**: Small, color-coded by status (green=stable, blue=empirical, amber=in-progress, gray=archived)
- **Sections**: Full-width with max-width container (6xl) and padding

### Responsive Design
- **Mobile-first**: Base styles for small screens
- **Tailwind breakpoints**: `sm`, `md`, `lg` for responsive behavior
- **Grid layouts**: 1 column mobile → 2–3 columns desktop

---

## Technical Features

### Next.js Features Used
- **App Router**: Modern file-based routing
- **Static Generation (SSG)**: All pages pre-rendered at build time
- **Metadata API**: SEO tags, viewport, charset
- **TypeScript**: Full type safety

### Tailwind Features Used
- **Utility-first CSS**: All styles from Tailwind utilities
- **Responsive utilities**: Mobile-first, breakpoint prefixes
- **Customization**: Neutral color scale extended
- **Plugins**: None yet (ready for typography, forms, etc.)

### Code Organization
- **Path aliases**: `@/components`, `@/config`, `@/types` for clean imports
- **Centralized config**: All content in one file
- **Type definitions**: Interfaces for all data structures
- **Component reuse**: 5 core components used across all pages

---

## Content Management

### Updating Site Content

All text, metadata, and structured data lives in:

```typescript
// config/site.ts
export const siteConfig = {
  title: 'HCSN Theory',
  description: '...',
  // ... etc
};

export const documentationItems = [
  { id: 'axioms', title: '...', status: 'Stable', ... },
  // ... etc
];
```

**To update:**
1. Edit `config/site.ts`
2. Content automatically reflects across the site
3. No page edits needed

### Adding New Pages

1. Create `app/newpage/page.tsx`
2. Import `{ Section, Card }` from `@/components`
3. Build with reusable components
4. Add to navbar in `components/Navbar.tsx`

### Adding Figures

1. Save image to `public/figures/`
2. Update `app/figures/page.tsx` to reference it
3. Add caption and metadata

---

## Important Constraints

### Language & Terminology

✓ **Correct:**
- Ω is an "order parameter"
- ξ is "transport activity" or "diagnostic variable"
- "exploratory research"
- "simulation evidence"
- "operational definitions"

✗ **Avoid:**
- "Ω field" or "ξ field"
- "unification" or "unified theory"
- "revolutionary," "breakthrough," "groundbreaking"
- Comparisons to quantum mechanics, relativity, etc.
- Unsubstantiated claims

### Content Grade Levels

All claims use consistent language:
- **Axiom**: Assumed, not derived
- **Observation**: Measured in simulation
- **Definition**: Operational construction
- **Derived Result**: Logical consequence
- **Conjecture**: Hypothesis awaiting validation

---

## Development Workflow

### Setup

```bash
cd website
npm install
npm run dev  # Start dev server on port 3000
```

### Build

```bash
npm run build  # Production build
npm start      # Run production server
```

### Static Export

```javascript
// In next.config.js, change:
output: 'export'
```

```bash
npm run build  # Outputs to ./out/
```

### Formatting & Linting

```bash
npx tsc --noEmit  # Check TypeScript
npx prettier --write .  # Format code
```

---

## Deployment Options

### Vercel (Recommended)

```bash
npm install -g vercel
vercel deploy
```

Automatic deployments on git push.

### Netlify

Build locally, deploy `out/` folder as static site.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Self-Hosted

Deploy as Node.js server or static site (export mode).

---

## Future Enhancements

### Short Term
- [ ] Add actual figures (simulation results)
- [ ] Dark mode support
- [ ] Mobile navbar (hamburger menu)
- [ ] Favicon and OG images

### Medium Term
- [ ] MDX integration (render markdown docs directly)
- [ ] LaTeX support (KaTeX for equations)
- [ ] Search functionality
- [ ] Blog/news section
- [ ] Interactive visualizations

### Long Term
- [ ] Simulation results dashboard
- [ ] Community contributions section
- [ ] Publication citations
- [ ] Data visualization tools

---

## Important Notes

### No Marketing Language

This is a **research site**, not a product launch. Avoid:
- Superlatives ("best," "only")
- Promises ("will solve," "prove")
- Hype ("disrupting physics")
- False certainty

### Intellectual Honesty

Always:
- Clearly mark empirical vs speculative
- Note limitations and open problems
- Credit simulation as source of truth
- Avoid implied unification claims

### Maintenance

- Keep `config/site.ts` updated as theory evolves
- Archive old documents when superseded
- Test all links before deployment
- Verify terminology consistency

---

## File Checklist

### Core Files (Required)
- ✅ `package.json` — Dependencies and scripts
- ✅ `tsconfig.json` — TypeScript configuration
- ✅ `tailwind.config.ts` — Tailwind theme
- ✅ `postcss.config.js` — CSS processor
- ✅ `next.config.js` — Next.js config
- ✅ `app/layout.tsx` — Root layout
- ✅ `components/index.ts` — Component exports
- ✅ `config/site.ts` — Content configuration
- ✅ `styles/globals.css` — Global styles

### Pages (All 6 Routes)
- ✅ `app/page.tsx` — Home
- ✅ `app/about/page.tsx` — About
- ✅ `app/docs/page.tsx` — Docs
- ✅ `app/figures/page.tsx` — Figures
- ✅ `app/roadmap/page.tsx` — Roadmap
- ✅ `app/contact/page.tsx` — Contact

### Components (5 Reusable)
- ✅ `components/Navbar.tsx`
- ✅ `components/Footer.tsx`
- ✅ `components/Card.tsx`
- ✅ `components/Badge.tsx`
- ✅ `components/Section.tsx`

### Documentation
- ✅ `README.md` — Project overview
- ✅ `SETUP.md` — Quick start
- ✅ `DEVELOPMENT.md` — Dev notes
- ✅ `.gitignore` — Git config

---

## Quick Start for Others

1. **Read SETUP.md** for installation and first run
2. **Edit config/site.ts** to customize content
3. **Run `npm run dev`** to develop locally
4. **Deploy to Vercel** or preferred host

---

## Status

✅ **Complete & Ready**

This website is production-ready. It requires:
- Node.js installation
- `npm install` to download dependencies
- Content updates in `config/site.ts`
- Actual figures (currently placeholders)
- Deployment to a host

No additional development needed to run.

---

**Built:** February 2026  
**Last Updated:** February 2026  
**Maintainer:** HCSN Research

