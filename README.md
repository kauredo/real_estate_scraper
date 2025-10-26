# Sofia Galvao Group - Real Estate Platform

A monorepo containing the complete Sofia Galvao Group real estate platform with multiple frontend applications and a shared Rails API backend.

## 🏗️ Architecture

This monorepo contains four main applications:

- **`/api`** - Rails API backend (deployed to Railway)
- **`/frontend`** - Main customer-facing website (Vite + React + TypeScript)
- **`/backoffice`** - Admin dashboard for managing listings, blog posts, etc. (Vite + React + TypeScript)
- **`/promo-site`** - Marketing/promotional site (Vite + React + TypeScript)

All three frontend applications share the same API backend.

## 🚀 Deployment

### Backend API
The Rails API is deployed to **Railway**. See [`railway-deploy.md`](./railway-deploy.md) for deployment instructions.

### Frontend Applications
All three frontend applications are deployed to **Vercel** as separate projects:

- **frontend (sgg)**: Main customer website
- **backoffice**: Admin dashboard
- **promo-site**: Marketing site

#### Important Vercel Configuration
Each Vercel project must be configured with the correct **Root Directory** in the project settings:

1. Go to Vercel Dashboard → Project Settings → General
2. Set **Root Directory**:
   - `frontend` for the main site
   - `backoffice` for the admin dashboard
   - `promo-site` for the marketing site
3. Save the configuration

This ensures Vercel builds from the correct subdirectory where `vite` and dependencies are installed.

See [`vercel-deploy.md`](./vercel-deploy.md) for detailed deployment instructions.

## 💻 Local Development

### Prerequisites
- Node.js 22.x (see `.nvmrc`)
- Ruby 3.x
- PostgreSQL
- Redis

### Setup

1. **Install root dependencies:**
```bash
npm install
```

2. **Install API dependencies:**
```bash
cd api && bundle install
```

3. **Install frontend dependencies:**
```bash
# Frontend
cd frontend && npm install

# Backoffice
cd backoffice && npm install

# Promo site
cd promo-site && npm install
```

4. **Setup database:**
```bash
cd api
rails db:create db:migrate db:seed
```

### Running the Applications

#### Run Everything (API + Jobs + Main Frontend)
```bash
npm run dev
```

This starts:
- Rails API server on port 3000
- Good Job background jobs
- Main frontend on port 5173

#### Run Individual Applications
```bash
# API only
npm run api

# Main frontend only
npm run frontend

# Background jobs only
npm run jobs

# Backoffice (from backoffice directory)
cd backoffice && npm run dev

# Promo site (from promo-site directory)
cd promo-site && npm run dev
```

## 📁 Project Structure

```
.
├── api/              # Rails API backend
├── backoffice/       # Admin dashboard (React + Vite)
├── frontend/         # Main customer website (React + Vite)
├── promo-site/       # Marketing site (React + Vite)
├── docs/             # Documentation
├── .github/          # GitHub Actions workflows
└── package.json      # Root package for running all services
```

## 🔧 Development Tools

- **API**: Rails 8.x, PostgreSQL, Redis, Good Job
- **Frontend**: Vite, React, TypeScript, TailwindCSS
- **Deployment**: Railway (API), Vercel (Frontends)

## 📚 Documentation

- [API Documentation](./api/README.md) - Complete API endpoint reference
- [Frontend README](./frontend/README.md) - Main website details
- [Backoffice README](./backoffice/README.md) - Admin dashboard details
- [Promo Site README](./promo-site/README.md) - Marketing site details
- [Railway Deployment](./railway-deploy.md) - Backend deployment guide
- [Vercel Deployment](./vercel-deploy.md) - Frontend deployment guide

## 🔐 Environment Variables

Each application requires specific environment variables. See the README in each directory for details:
- API: See `api/README.md`
- Frontend applications: Check individual Vercel project settings
