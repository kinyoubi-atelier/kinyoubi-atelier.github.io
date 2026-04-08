# Deployment Guide — Kinyoubi Atelier & Co.

## Phase 1: GitHub Pages (free, immediate)

### First-time setup

1. **Create a GitHub account** at [github.com/signup](https://github.com/signup)

2. **Install Git** (if not already installed):
   ```bash
   # macOS (comes pre-installed, or via Homebrew)
   brew install git

   # Verify
   git --version
   ```

3. **Configure Git with your identity:**
   ```bash
   git config --global user.name "Ankit Sahu"
   git config --global user.email "your-github-email@example.com"
   ```

4. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `kinyoubi-website`
   - Set to **Public** (required for free GitHub Pages)
   - Do NOT initialize with README (we already have code)
   - Click **Create repository**

5. **Push the code:**
   ```bash
   cd ~/Desktop/"KINYOUBI ATELIER & CO."/"KINYOUBI WEBSITE CODE"
   git init
   git add .
   git commit -m "Initial commit — Kinyoubi Atelier & Co. website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kinyoubi-website.git
   git push -u origin main
   ```

6. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Under "Build and deployment", set Source to **GitHub Actions**
   - The workflow will auto-run on your next push
   - Your site will be live at: `https://YOUR_USERNAME.github.io/kinyoubi-website/`

7. **Optional — Add environment variables as GitHub Secrets:**
   - Go to repo → Settings → Secrets and variables → Actions
   - Add secrets for: `UMAMI_WEBSITE_ID`, `CRISP_WEBSITE_ID`, `CAL_USERNAME`, `FORMSPREE_ID`
   - Then uncomment the corresponding lines in `.github/workflows/deploy.yml`

### Updating the site

Every time you push to `main`, the site auto-deploys:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

---

## Phase 2: Custom domain on Vercel (one-click)

When you acquire your domain (e.g., kinyoubi.com):

1. **Sign up at [vercel.com](https://vercel.com)** using your GitHub account

2. **Import your repo:**
   - Click "Add New Project"
   - Select `kinyoubi-website` from your GitHub repos
   - Vercel auto-detects Next.js — click **Deploy**

3. **Add your domain:**
   - Go to Project Settings → Domains
   - Add `kinyoubi.com` and `www.kinyoubi.com`
   - Vercel gives you DNS records — add them at your domain registrar

4. **Add environment variables:**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_CRISP_WEBSITE_ID`, etc.

5. **Update next.config.mjs for Vercel:**
   - Remove `output: 'export'` (Vercel handles SSR natively)
   - Remove `images: { unoptimized: true }` (Vercel has image optimization)
   - Remove `trailingSlash: true`
   - The `vercel.json` file handles security headers automatically

6. **Update SITE.url in `lib/constants.ts`:**
   ```typescript
   url: 'https://kinyoubi.com',
   ```

7. **Disable GitHub Pages** (optional, to avoid confusion):
   - Repo → Settings → Pages → Source → None

That's it. Every push to `main` auto-deploys to your custom domain with SSL, CDN, and image optimization.

---

## Architecture

```
GitHub repo (source of truth)
    │
    ├── Push to main
    │       │
    │       ├── [Phase 1] GitHub Actions → Static export → GitHub Pages
    │       │                               yourname.github.io/kinyoubi-website
    │       │
    │       └── [Phase 2] Vercel webhook → Build → Deploy → kinyoubi.com
    │
    └── Environment variables
            ├── GitHub Secrets (for GitHub Pages builds)
            └── Vercel Env Vars (for Vercel builds)
```
