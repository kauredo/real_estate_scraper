# Vercel Deployment Guide

## Automated GitHub Deployment

All three frontend projects are configured for automatic deployment via Vercel's Git integration. Pushes to `main` branch that modify each project's directory will automatically trigger deployments.

## Projects Overview

| Project    | Vercel Project Name | Directory     | Framework |
| ---------- | ------------------- | ------------- | --------- |
| Frontend   | sgg                 | `frontend/`   | Vite      |
| Backoffice | backoffice          | `backoffice/` | Vite      |
| Promo Site | promo-site          | `promo-site/` | Vite      |

## Initial Setup (Per Project)

### 1. Connect Repository (if not already connected)

For each project:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the project (sgg, backoffice, or promo-site)
3. Go to **Settings** → **Git**
4. If not connected, click **Connect Git Repository**
   - Repository: `kauredo/real_estate_scraper`
   - Production Branch: `main`

### 2. Configure Root Directory

For each project, set the correct root directory:

1. Go to **Settings** → **General**
2. Set **Root Directory**:
   - **frontend** project → `frontend`
   - **backoffice** project → `backoffice`
   - **promo-site** project → `promo-site`

### 3. Configure Build Settings

Each project should have these settings (usually auto-detected):

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Configure Environment Variables

If your projects need environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add variables for Production, Preview, and Development as needed

Example variables you might need:

```
VITE_API_URL=https://your-api.railway.app
VITE_APP_NAME=Your App Name
```

## Configuration Files

Each project has a `vercel.json` file that configures:

### Frontend (`frontend/vercel.json`)

- SPA routing rewrites
- Git deployment settings
- Monorepo path filtering (only deploys when `frontend/` changes)

### Backoffice (`backoffice/vercel.json`)

- Git deployment settings
- Monorepo path filtering (only deploys when `backoffice/` changes)

### Promo Site (`promo-site/vercel.json`)

- Git deployment settings
- Monorepo path filtering (only deploys when `promo-site/` changes)

## How It Works

### Automatic Deployments

1. You push changes to `main` branch
2. Vercel detects the push
3. Each project checks if its directory was modified using `ignoreCommand`
4. If changes detected → Build & deploy automatically
5. If no changes → Skip deployment (saves build time)

### Path Filtering Logic

Each `vercel.json` contains:

```json
{
  "ignoreCommand": "bash -c 'if git diff HEAD^ HEAD --quiet -- {directory}/; then exit 0; else exit 1; fi'"
}
```

This command:

- Compares current commit with previous commit
- Checks if the project's directory has changes
- Exit 0 (skip build) if no changes
- Exit 1 (proceed with build) if changes detected

## Deployment URLs

After setup, you'll have:

- **Production**: Deploys from `main` branch
  - `https://sgg.vercel.app` (or your custom domain)
  - `https://backoffice.vercel.app` (or your custom domain)
  - `https://promo-site.vercel.app` (or your custom domain)

## Troubleshooting

### Build fails with "Command not found"

Check that `package.json` has the correct `build` script:

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

### All projects deploy on every push

Check that:

1. `vercel.json` exists in each project directory
2. `ignoreCommand` is properly configured
3. Git integration is using the correct root directory

### Environment variables not working

- Ensure variables are prefixed with `VITE_` in Vite projects
- Redeploy after adding/changing environment variables

## Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project directory
cd frontend  # or backoffice, or promo-site
vercel --prod
```

## Linking Projects Locally

To link local projects to Vercel (for pulling env vars, etc.):

```bash
cd frontend
vercel link

cd ../backoffice
vercel link

cd ../promo-site
vercel link
```

This creates `.vercel/project.json` files (already present in your projects).
