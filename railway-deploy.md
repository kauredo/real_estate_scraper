# Railway Deployment Guide

## Automated GitHub Deployment (Recommended)

The API is configured for automatic deployment via Railway's GitHub integration. Pushes to `main` branch will automatically trigger a deployment.

### Initial Setup

1. **Connect Repository to Railway**

   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Select your "Real Estate Scraper" project
   - Go to Settings → Service Settings
   - Connect repository: `kauredo/real_estate_scraper`
   - Set **Root Directory**: `api`
   - Set **Branch**: `main`

2. **Configure Environment Variables** (if not already set)

   ```bash
   railway variables set RAILS_ENV=production
   railway variables set RAILS_MASTER_KEY=<your_master_key>
   railway variables set ALLOWED_HOSTS=*.railway.app,*.vercel.app
   ```

3. **Database** (if not already added)
   ```bash
   railway add --database postgresql
   ```

### Configuration File

The `api/railway.toml` file configures:

- Dockerfile-based builds (using `api/Dockerfile`)
- Health check endpoint at `/api/health`
- Automatic restart policy on failure

### How It Works

- Push to `main` → Railway uses `api/` as root directory → Reads `railway.toml` → Builds using Dockerfile → Deploys automatically
- No manual `railway up` needed

## Manual Deployment (Legacy)

If you need to deploy manually for testing:

```bash
cd api
railway up
```

## Step 2: Update Rails Configuration

### Update CORS for Multiple Frontends

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # Will restrict this later per frontend
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
```

### Update Allowed Hosts

```ruby
# config/environments/production.rb
config.hosts << /.*\.railway\.app/
config.hosts << /.*\.vercel\.app/
config.hosts << /.*\.netlify\.app/
```

## API URL Structure

Your API will be available at: `https://your-app-name.railway.app`

Each frontend will call: `https://your-app-name.railway.app/api/...`
