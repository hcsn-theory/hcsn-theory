# HCSN Theory Website

A professional, modern research website for Hierarchical Causal Structure Networks (HCSN) theory.

## Technology Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Standalone or Static Export

## Project Structure

```
website/
├── app/                      # App Router pages and layouts
│   ├── layout.tsx           # Root layout (nav, footer, metadata)
│   ├── page.tsx             # Home page
│   ├── about/page.tsx       # About the project
│   ├── docs/page.tsx        # Documentation overview
│   ├── figures/page.tsx     # Figures gallery
│   ├── roadmap/page.tsx     # Development roadmap
│   └── contact/page.tsx     # Contact and FAQ
│
├── components/              # Reusable React components
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer
│   ├── Card.tsx             # Reusable card component
│   ├── Badge.tsx            # Status badges
│   ├── Section.tsx          # Section wrapper
│   └── index.ts             # Component exports
│
├── config/
│   └── site.ts              # Site metadata and content config
│
├── styles/
│   └── globals.css          # Global Tailwind styles
│
├── types/
│   └── index.ts             # TypeScript type definitions
│
├── public/                  # Static assets (to be created)
│   ├── favicon.ico
│   └── ...
│
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind configuration
├── postcss.config.js        # PostCSS plugins
├── next.config.js           # Next.js configuration
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Static Export

To generate a fully static site:

1. Update `next.config.js`:
   ```js
   output: 'export'
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Output will be in `out/` directory.

## Content Management

### Site Metadata

Edit `config/site.ts` to update:
- Site title, description, disclaimer
- Documentation items
- Core ideas
- Roadmap phases

### Pages

All pages use reusable `Section`, `Card`, and `Badge` components for consistent styling.

- **Home** (`app/page.tsx`): Hero + all main sections
- **About** (`app/about/page.tsx`): Philosophy and motivation
- **Docs** (`app/docs/page.tsx`): Documentation overview + glossary
- **Figures** (`app/figures/page.tsx`): Figure gallery (placeholders)
- **Roadmap** (`app/roadmap/page.tsx`): Progress and future directions
- **Contact** (`app/contact/page.tsx`): Contact info and FAQ

### Adding New Content

1. **New documentation item:** Update `documentationItems` in `config/site.ts`
2. **New figure:** Add entry to `figures` array in `app/figures/page.tsx`
3. **New roadmap milestone:** Update `roadmapItems` in `config/site.ts`

## Design Principles

- **Clean & Modern:** Minimal aesthetic with subtle interactions
- **Academic Credibility:** Professional tone, careful language
- **Responsive:** Mobile-first design using Tailwind utilities
- **Accessible:** Semantic HTML, ARIA labels, good contrast
- **Fast:** Static generation, optimized images, no bloat

## Key Design Decisions

- **Neutral Color Palette:** Grays for calm, professional feel
- **No Hype Language:** "Revolutionary," "breakthrough" avoided
- **Status Badges:** Visual indicators of document maturity
- **Operational Language:** All descriptions grounded in HCSN framework
- **No External Framework Claims:** Careful about terminology (Ω, ξ)

## Future Enhancements

- [ ] Dark mode support
- [ ] MDX integration for direct markdown rendering
- [ ] Interactive visualizations (D3.js, Three.js)
- [ ] Search functionality
- [ ] Blog/news section
- [ ] Latex equation rendering (KaTeX)
- [ ] PDF export for documents

## Important Notes

### Terminology

- ✓ Ω is always an "order parameter," never a "field"
- ✓ ξ is always "transport activity," never "transport field"
- ✓ No claims of equivalence to known physics
- ✓ Careful, neutral language throughout

### Content Constraints

- No marketing language
- No unproven claims
- Empirical status clearly marked
- Speculation labeled as such
- Honest about limitations

## Contributing

To contribute:

1. Follow the TypeScript and Tailwind conventions
2. Keep components reusable and well-commented
3. Test changes locally before committing
4. Ensure no inadvertent physics claims
5. Update config files if adding major sections

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Hosting (Netlify, GitHub Pages)

Build static export and deploy the `out/` folder.

## License

[Your License Here]

## Contact

For questions about the website or HCSN Theory, see `/contact`.

---

Built with Next.js and Tailwind CSS. Last updated February 2026.
