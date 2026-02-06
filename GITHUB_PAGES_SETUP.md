# Deployment Guide

## GitHub Pages Deployment

This website is configured for automatic deployment to GitHub Pages.

### Prerequisites

1. Your repository must be public (or you have a GitHub Pro account)
2. You have admin access to the repository settings

### Automatic Deployment (Recommended)

The website will automatically deploy when you push to the `main` branch.

**Setup Instructions:**

1. Go to your GitHub repository settings
2. Navigate to **Settings → Pages**
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - This will automatically use the workflow we configured

4. The first deployment will run automatically
5. Access your site at: `https://yourusername.github.io/hcsn-theory/`

### Manual Deployment

If automatic deployment doesn't work:

1. Build locally:
   ```bash
   cd website
   npm run build
   ```

2. The static files will be in `website/out/`

3. Deploy to GitHub Pages:
   ```bash
   npx gh-pages -d website/out -b gh-pages
   ```

### Configuration

The website is configured with:
- **Output**: Static HTML export (`output: 'export'`)
- **Base Path**: Configured for subdirectory deployment
- **No Build Cache**: Fresh builds on each push

### Environment Variables

If you need to customize the deployment:

```env
# In .env.local or GitHub Secrets
NEXT_PUBLIC_BASE_PATH=/hcsn-theory  # If deploying to a subdirectory
```

### Troubleshooting

**Issue: Site not updating**
- Check the "Actions" tab for workflow errors
- Ensure you pushed to `main` branch
- Wait 2-3 minutes for build to complete

**Issue: Pages looks broken**
- Verify `basePath` is correct in `next.config.js`
- Clear browser cache (Ctrl+Shift+Delete)
- Check "Settings → Pages" to confirm deployment source

**Issue: Markdown docs not loading**
- Ensure `/docs/*.md` files exist in the parent directory
- Check browser console for API errors
- Verify file permissions are correct

### Custom Domain

To use a custom domain:

1. Go to **Settings → Pages**
2. Under "Custom domain", enter your domain (e.g., `hcsn.example.com`)
3. Add DNS CNAME record pointing to `yourusername.github.io`
4. Wait for DNS to propagate (~24 hours)

### Alternative Hosting

If you prefer other platforms:

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=out
```

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Docker (self-hosted):**
```bash
docker build -t hcsn-website .
docker run -p 3000:3000 hcsn-website
```

### Performance Notes

- Static export (GitHub Pages) provides excellent performance
- No cold starts or server costs
- CDN-delivered through GitHub's infrastructure
- Suitable for documentation sites with infrequent updates

---

*For more information, see [GitHub Pages Documentation](https://docs.github.com/en/pages)*
