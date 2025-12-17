# GitHub Pages Deployment Guide

## Setup Complete! ✅

Your Santa Chatbot is ready to deploy to GitHub Pages.

## What Was Configured

### 1. Vite Config Updated
- Added `base: '/santa-chatbot/'` for proper asset paths
- Ensures all resources load correctly on GitHub Pages

### 2. GitHub Actions Workflow Created
- File: `.github/workflows/deploy.yml`
- Automatically builds and deploys on every push to `main`
- Uses Node.js 20 for compatibility
- Uploads build to GitHub Pages

### 3. .gitignore Updated
- Ensures `.env` file is NEVER committed
- Protects your API key from being exposed
- Added `.env.local` and `.env.production` too

## Deployment Steps

### Step 1: Push to GitHub

If you haven't already, push your code:

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source", select **GitHub Actions**
5. Click **Save**

### Step 3: Wait for Deployment

1. Go to the **Actions** tab in your repo
2. Watch the "Deploy to GitHub Pages" workflow run
3. Should take ~2-3 minutes
4. Green checkmark = successful deployment! ✅

### Step 4: Visit Your Site

Your site will be live at:
```
https://[your-username].github.io/santa-chatbot/
```

Replace `[your-username]` with your GitHub username.

## Important: API Key Configuration

### The Problem
Your `.env` file is gitignored (correctly!) so it won't be deployed. The deployed site needs the OpenRouter API key to work.

### Solutions

**Option 1: Hardcode API Key (Quick but not secure)**

In `ChatInterface.tsx`, replace:
```typescript
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
```

With:
```typescript
const apiKey = 'your-actual-api-key-here';
```

⚠️ **WARNING:** Anyone can see this in your source code!

**Option 2: GitHub Secrets (More Secure)**

1. Go to repo Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `VITE_OPENROUTER_API_KEY`
4. Value: Your OpenRouter API key
5. Update `.github/workflows/deploy.yml` to inject it during build:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_OPENROUTER_API_KEY: ${{ secrets.VITE_OPENROUTER_API_KEY }}
```

**Option 3: Prompt User for API Key (Best for public repos)**

Add UI to let users enter their own API key:
- Show input field on first load
- Store in localStorage
- User provides their own free OpenRouter key

**Option 4: Deploy Locally (For Testing)**

Test the build locally before pushing:
```bash
npm run build
npx vite preview
```

Visit http://localhost:4173 to see the production build.

## Troubleshooting

### Build Fails

**Check the Actions tab for errors:**
- Node version incompatibility? (uses Node 20)
- Missing dependencies? (run `npm install` locally first)
- TypeScript errors? (run `npm run build` locally to check)

### Site Shows 404

**Vite base path might be wrong:**
- Check `vite.config.ts` has correct repo name
- Should match: `base: '/your-repo-name/'`
- Don't forget the leading and trailing slashes!

### Assets Not Loading

**Base path issue:**
- All asset paths are relative to `/santa-chatbot/`
- If your repo name is different, update `vite.config.ts`
- Rebuild and redeploy

### API Key Not Working

**Environment variable not set:**
- Check if you're using GitHub Secrets (Option 2 above)
- Verify secret name matches exactly
- Make sure workflow has `env:` section in build step

### Changes Not Appearing

**Clear GitHub Actions cache:**
- Wait ~2 minutes for deployment
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check Actions tab to confirm new deployment ran

## Updating Your Site

Every time you push to `main`:
1. GitHub Actions automatically triggers
2. Builds your app
3. Deploys to GitHub Pages
4. Takes ~2-3 minutes

**Manual trigger:**
- Go to Actions tab
- Click "Deploy to GitHub Pages"
- Click "Run workflow"

## Local Development vs Production

### Local (Development)
```bash
npm run dev
# Runs at http://localhost:5173
# Hot reload enabled
# Uses .env file for API key
```

### Production (GitHub Pages)
```bash
npm run build
npx vite preview
# Runs at http://localhost:4173
# Production-optimized build
# Needs API key configured (see options above)
```

## Workflow File Explained

```yaml
on:
  push:
    branches: [main]  # Triggers on push to main

jobs:
  build:
    - Checkout code
    - Setup Node.js 20
    - Install dependencies (npm ci)
    - Build app (npm run build)
    - Upload dist/ folder

  deploy:
    - Deploy uploaded artifact to GitHub Pages
```

## Custom Domain (Optional)

Want `santa.yourdomain.com` instead of GitHub's URL?

1. Buy a domain
2. Add CNAME file to `public/` folder:
   ```
   santa.yourdomain.com
   ```
3. Configure DNS:
   - Add CNAME record pointing to `[username].github.io`
4. In repo Settings → Pages → Custom domain
5. Enter your domain and save

## Security Best Practices

✅ **DO:**
- Keep `.env` in `.gitignore`
- Use GitHub Secrets for sensitive data
- Rotate API keys regularly
- Monitor OpenRouter usage dashboard

❌ **DON'T:**
- Commit `.env` file
- Hardcode API keys (unless you understand the risks)
- Share your repo if it contains keys
- Use production keys in public code

## Next Steps

1. **Push to GitHub** (if not already done)
2. **Enable GitHub Pages** in repo settings
3. **Wait for first deployment** (~2 minutes)
4. **Configure API key** (choose one of the options above)
5. **Test your live site!**

## Support

- **GitHub Actions failing?** Check the Actions tab for logs
- **Site not loading?** Verify base path in vite.config.ts
- **API errors?** Check API key configuration
- **Still stuck?** Check browser console (F12) for errors

---

**Your deployment is configured and ready to go!** 🎅🚀
