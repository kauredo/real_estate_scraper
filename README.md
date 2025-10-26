# Real Estate Scraper

Monorepo containing the Real Estate Scraper application.

## Structure

- `/api` - Rails API backend
- `/frontend` - Vite React frontend

## Development

1. Install dependencies:

```bash
# API
cd api && bundle install

# Frontend
cd frontend && npm install

# Root (for running both services)
npm install
```

2. Start development servers:

```bash
npm run dev
```

This will start both the API (port 3000) and frontend (port 5173) in parallel.
