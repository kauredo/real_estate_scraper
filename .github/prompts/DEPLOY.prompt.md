# Real Estate Scraper Deployment Strategy

## Application Overview

You are helping deploy a **Real Estate Scraper** application that consists of two main components:

### Backend (Rails API) - `/api` directory

- **Framework**: Ruby on Rails 7.x API-only application
- **Ruby Version**: 3.1.3
- **Database**: PostgreSQL
- **Background Jobs**: GoodJob (PostgreSQL-based job queue)
- **Web Scraping**: Uses Selenium WebDriver with Chrome/Chromedriver for scraping real estate listings from KW Portugal website
- **Key Features**:
  - Web scraping service that extracts property listings, images, descriptions in multiple languages (Portuguese/English)
  - REST API endpoints with JWT authentication
  - Background job processing for scraping tasks
  - Multi-language support (i18n)
  - Image handling with CarrierWave

### Frontend (React/Vite) - `/frontend` directory

- **Framework**: React with Vite build tool
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Key Features**:
  - Modern React SPA with responsive design
  - Real estate listing display and search
  - Admin interface for managing listings
  - Multi-language support
  - Image galleries and property details

## Current Deployment (How it used to work)

The Rails API was previously deployed on **Fly.io** with the following configuration:

### Fly.io Setup

- **Platform**: Fly.io (https://fly.io)
- **Region**: Paris (cdg)
- **Process Types**:
  - `web`: Rails server (Puma) on port 3000
  - `worker`: Background job processor (GoodJob) on port 4000
- **Database**: PostgreSQL managed by Fly.io
- **Container**: Docker-based deployment using multi-stage build
- **Chrome/Selenium**: Custom Dockerfile installs Chrome browser and ChromeDriver for web scraping
- **Static Assets**: Served by Rails in production mode

### Key Files from Previous Deployment:

- `api/Dockerfile`: Multi-stage Docker build with Chrome, Node.js, and Rails
- `api/fly.toml`: Fly.io configuration with web and worker processes
- Release command runs database migrations
- Environment variables for production configuration

### Infrastructure Requirements:

- **Chrome Browser**: Required for Selenium web scraping (headless mode in production)
- **PostgreSQL Database**: For application data and job queue
- **Background Job Processing**: For handling scraping tasks asynchronously
- **File Storage**: For property images (previously using local storage)

## Frontend Deployment Gap

The **frontend was never deployed** - it's a new addition to the application. The previous setup only deployed the Rails APP (it was not an API before, but a full-fledged web application).

## New Deployment Requirements

Please evaluate and recommend deployment strategies considering:

### 1. **Deployment Ease & Speed**

- Simple setup and configuration
- Minimal DevOps overhead
- Quick deployment pipeline
- Easy rollbacks and updates

### 2. **Cost Optimization**

- Budget-friendly for a personal/small business project
- Efficient resource utilization
- Predictable pricing model
- Free tier availability if possible

### 3. **Technical Requirements**

- **Backend needs**:
  - Chrome browser support for Selenium
  - PostgreSQL database
  - Background job processing
  - Environment variable management
- **Frontend needs**:
  - Static hosting with SPA routing support
  - CDN for performance
  - Custom domain support

### 4. **Maintainability**

- Monitoring and logging capabilities
- Automatic scaling if needed
- Database backup and recovery
- CI/CD integration potential

### 5. **Architecture Options to Consider**

#### Option A: Monolithic Deployment

- Deploy both frontend and backend together
- Frontend built and served by Rails as static assets

#### Option B: Separate Deployments

- Backend API on one platform
- Frontend SPA on another platform
- Cross-origin resource sharing (CORS) configuration

#### Option C: Containerized Deployment

- Docker-compose setup for local development parity
- Container orchestration platforms

### 6. **Platform Suggestions Needed**

Please evaluate these platforms and suggest the best approach:

- **Fly.io** (continue with current platform)
- **Railway**
- **Render**
- **DigitalOcean App Platform**
- **Heroku**
- **AWS** (Lightsail, ECS, etc.)
- **Vercel/Netlify** (for frontend)
- **Google Cloud Run**
- **Self-hosted VPS**

### 7. **Specific Challenges to Address**

- **Chrome/Selenium deployment**: Many platforms don't support GUI applications
- **Database migration**: From current Fly.io PostgreSQL setup (can be dumped and restored from dump)
- **Environment variables**: Secure configuration management
- **Image storage**: Current local storage needs cloud alternative (was using cloudinary and carrierwave, can continue to do so)
- **Background jobs**: Reliable job processing in production
- **CORS**: Frontend-backend communication setup

## Questions to Answer

1. **What's the most cost-effective deployment strategy for this full-stack application?**

2. **Should we keep the monorepo structure or split deployments?**

3. **How to handle the Chrome/Selenium requirement across different platforms?**

4. **What's the migration path from current Fly.io setup?**

5. **Recommended CI/CD pipeline for both frontend and backend?**

6. **Best practices for environment management across development/production?**

7. **Database and file storage recommendations?**

Please provide a detailed analysis with step-by-step deployment instructions for your recommended approach, including cost estimates and trade-offs for each option.
