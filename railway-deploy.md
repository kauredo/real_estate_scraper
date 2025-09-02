# Railway Deployment Guide

## Step 1: Railway Setup

### Install Railway CLI

```bash
npm install -g @railway/cli
railway login
```

### Create Railway Project

```bash
cd api
railway init
railway add --database postgresql
```

### Set Environment Variables

```bash
railway variables set RAILS_ENV=production
railway variables set RAILS_MASTER_KEY=$(cat config/master.key)
railway variables set ALLOWED_HOSTS=*.railway.app,*.vercel.app
```

### Deploy

```bash
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
