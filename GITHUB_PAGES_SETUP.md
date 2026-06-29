# GitHub Pages Configuration

## To Enable GitHub Pages for This Repository:

1. **Go to your repository settings:**
   - Navigate to: https://github.com/marmees13/zrs_olympic-games/settings

2. **Enable GitHub Pages:**
   - Scroll to the **"Pages"** section in the left sidebar
   - Under **"Build and deployment"** → **"Source"**, select:
     - Branch: `gh-pages`
     - Folder: `/ (root)`
   - Click **Save**

3. **Wait for deployment:**
   - GitHub will process the deployment
   - Your site will be available at: https://marmees13.github.io/zrs-olympic-games/
   - This may take 1-2 minutes to activate

## What This Repository Does:

This repository uses **GitHub Actions** to automatically build and deploy to GitHub Pages whenever you push to the `main` branch.

- Commits to `main` → GitHub Actions builds the app → Deploys to `gh-pages` branch
- GitHub Pages serves from the `gh-pages` branch
- The app will update automatically with each push

## Local Testing:

To test the app locally:
```bash
npm start          # Run development server at http://localhost:8080
npm run build      # Build for production
npm run deploy     # Deploy to GitHub Pages (requires gh-pages branch configured)
```

## Troubleshooting:

If the site still shows 404 after configuring GitHub Pages:

1. Clear your browser cache (Ctrl+Shift+Delete)
2. Wait 5-10 minutes for GitHub Pages to cache update
3. Visit https://marmees13.github.io/zrs-olympic-games/ again
4. Check GitHub Pages settings again to confirm `gh-pages` branch is selected

## Files Structure:

- `src/` - React source code
- `dist/` - Built production files (auto-generated)
- `public/` - Static HTML template
- `.nojekyll` - Tells GitHub Pages to skip Jekyll processing
- `.github/workflows/deploy.yml` - GitHub Actions workflow for auto-deployment
