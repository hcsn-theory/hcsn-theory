# HCSN Theory Website — Getting Started

This guide walks through the website setup and first steps.

## Quick Start

### 1. Installation

```bash
cd website
npm install
```

### 2. Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Overview

This is a **Next.js + TypeScript + Tailwind CSS** website for HCSN Theory research.

### Pages

| URL | Purpose |
|-----|---------|
| `/` | Home: overview, hero, core ideas, figures preview, roadmap teaser |
| `/about` | Philosophy, motivation, how simulations guide theory |
| `/docs` | Documentation overview, glossary, key concepts |
| `/figures` | Figure gallery (placeholders for simulation visualizations) |
| `/roadmap` | Milestones, current focus, future directions |
| `/contact` | Email, GitHub, FAQ, collaboration info |

### Key Components

- `Navbar`: Top navigation
- `Footer`: Copyright, links, quick info
- `Card`: Reusable card wrapper
- `Badge`: Status indicators (Stable/Empirical/In Progress)
- `Section`: Consistent section layout with title & subtitle

### Configuration

All site content lives in `config/site.ts`:
- Site metadata (title, description, disclaimer)
- Documentation items list
- Core ideas
- Roadmap phases
- etc.

Edit this file to update content across the site.

## Important Constraints

**Do NOT:**
- Refer to Ω or ξ as "fields"
- Claim unification with known physics
- Use hype words ("revolutionary," "breakthrough")
- Make unsupported claims

**DO:**
- Use careful, neutral language
- Mark empirical vs speculative clearly
- Update config.ts when changing content
- Keep components reusable

## Common Tasks

### Add a new documentation item

1. Open `config/site.ts`
2. Add entry to `documentationItems` array
3. Update `app/docs/page.tsx` if needed

### Add a figure

1. Create image and save to `public/figures/`
2. Update `app/figures/page.tsx` to reference it
3. Add caption and source

### Update the home page

1. Edit `app/page.tsx` directly
2. Use existing `<Section>` and `<Card>` components
3. Keep styling consistent

### Change site metadata

1. Edit `config/site.ts` (siteConfig object)
2. Update `app/layout.tsx` for metadata tags

## Build & Deploy

### Local Static Build

```bash
# Change next.config.js to: output: 'export'
npm run build
# Output in ./out/
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel deploy
```

### Deploy to Netlify

Build locally, deploy `out/` folder.

## Styling

Uses **Tailwind CSS**. Common utilities:
- Spacing: `p-4`, `my-6`, `gap-8`
- Text: `text-neutral-900`, `font-semibold`, `text-lg`
- Hover: `hover:bg-neutral-800`, `transition-colors`
- Responsive: `md:grid-cols-2`, `sm:text-lg`

## TypeScript

All files are TypeScript (`.ts` / `.tsx`). Types defined in `types/index.ts`:
- `DocumentationItem`
- `CoreIdea`
- `RoadmapItem`
- `Figure`

## Next Steps

1. **Fill in config:** Update `config/site.ts` with actual content
2. **Add figures:** Update `app/figures/page.tsx` with real images
3. **Customize:** Adjust colors, fonts, layout as needed
4. **Deploy:** Choose hosting (Vercel recommended)

## Common Issues

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Styles not showing
Ensure `globals.css` is imported in `app/layout.tsx` and PostCSS is running.

### Build fails
Check that all imports are correct and no TypeScript errors exist:
```bash
npx tsc --noEmit
```

## Support

For HCSN Theory questions: see `/contact`  
For website issues: check the code or refer to Next.js docs

---

Last updated: February 2026
