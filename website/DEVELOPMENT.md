# HCSN Theory Website — Development Notes

## Architecture

### Next.js App Router
- Pages are in `app/` directory
- Layouts cascade from `app/layout.tsx`
- Each page exports a default React component

### Component Strategy
- **Reusable:** Card, Badge, Section, Navbar, Footer
- **Page-specific:** Content unique to each route
- **Centralized config:** All metadata in `config/site.ts`

### Styling
- Tailwind CSS for utility-first styling
- `globals.css` for base styles and custom utilities
- No CSS modules needed (Tailwind handles everything)

## Adding Features

### New Page

1. Create `app/[newpage]/page.tsx`:
```tsx
import { Section, Card } from '@/components';

export default function NewPage() {
  return (
    <Section title="Title" subtitle="Subtitle">
      <Card>Content</Card>
    </Section>
  );
}
```

2. Add to navbar in `components/Navbar.tsx`

### New Component

1. Create `components/MyComponent.tsx`
2. Export from `components/index.ts`
3. Import with `import { MyComponent } from '@/components'`

### New Config Data

1. Add to `config/site.ts`
2. Import in page with `import { dataItem } from '@/config/site'`
3. Map over data to render

## Performance Notes

- **Image optimization:** Use Next.js `Image` component (not implemented yet)
- **Code splitting:** Automatic per-page
- **CSS:** Tailwind purges unused styles at build time
- **Static generation:** All pages are statically generated (SSG)

## Future Integrations

### MDX (Markdown + React)

For rendering documentation directly from `.mdx` files:

```bash
npm install @next/mdx @mdx-js/loader
```

Then use in `app/docs/[doc]/page.tsx`.

### LaTeX (KaTeX)

For equation rendering:

```bash
npm install katex react-katex
```

Use in theory documents.

### Dark Mode

With Tailwind:

```tsx
<html class="dark">
  <body class="dark:bg-neutral-900 dark:text-white">
    {/* ... */}
  </body>
</html>
```

### Analytics

Add Vercel Analytics or Plausible:

```tsx
// In app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Maintenance

### Update Dependencies

```bash
npm update
```

### Check for Issues

```bash
npm audit
npx tsc --noEmit
```

### Format Code

```bash
npx prettier --write .
```

## Deployment Checklist

- [ ] All links work
- [ ] Metadata correct (title, description)
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Terminology correct (Ω, ξ, no "field" language)
- [ ] No unsubstantiated claims
- [ ] All images loaded
- [ ] SEO tags present

## File Purposes

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts |
| `tsconfig.json` | TypeScript config, path aliases |
| `tailwind.config.ts` | Tailwind theme, plugins |
| `postcss.config.js` | PostCSS plugins (Tailwind) |
| `next.config.js` | Next.js build config |
| `app/layout.tsx` | Root layout, metadata, providers |
| `components/*.tsx` | Reusable UI components |
| `config/site.ts` | Content config, metadata |
| `styles/globals.css` | Global styles, typography |
| `types/index.ts` | TypeScript definitions |

## Debugging

### Hot Reload Not Working
- Check that you're editing files in the correct location
- Try clearing `.next/` and restarting server

### Tailwind Classes Not Applied
- Ensure file extension is `.tsx` or `.ts`
- Check that `globals.css` is imported in root layout
- Clear Tailwind cache: `rm -rf .next/`

### TypeScript Errors
- Run `npx tsc --noEmit` to see all errors
- Check import paths match aliases in `tsconfig.json`

## Best Practices

1. **Components:** Keep them small and reusable
2. **Config:** All content in `config/site.ts`
3. **Types:** Define in `types/index.ts`, import with `@/types`
4. **Styling:** Use Tailwind utilities, avoid inline styles
5. **Comments:** Add JSDoc for components and complex logic

---

Last updated: February 2026
