# Promo Site - Marketing Website

The promotional/marketing website for the Sofia Galvao Group real estate platform. This application serves as a landing page and marketing tool separate from the main customer-facing website.

## 🎯 Purpose

This is a marketing-focused site designed to:
- Showcase the brand and services
- Generate leads
- Provide promotional content
- Drive traffic to the main platform
- Support marketing campaigns

## 🛠️ Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **i18next** - Internationalization (PT/EN)
- **Lucide React** - Icons
- **CVA** - Class Variance Authority for component variants

## 🚀 Development

### Prerequisites
- Node.js 22.x (see root `.nvmrc`)
- Backend API running (optional, if consuming API data)

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env.local` file with any required environment variables:
```env
VITE_API_URL=http://localhost:3000/api/v1
```

For production deployment on Vercel, set this in the project environment variables.

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deployment

This application is deployed to **Vercel** as a separate project.

### Vercel Configuration

**Important**: The project must be configured with the correct **Root Directory**:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the promo-site project → Settings → General
3. Set **Root Directory** to: `promo-site`
4. Framework Preset: Vite
5. Build Command: `vite build`
6. Output Directory: `dist`
7. Install Command: `npm install`

### Environment Variables on Vercel
Set these in the Vercel project settings as needed:
- `VITE_API_URL` - Production API URL (if consuming API data)
- Any analytics or tracking IDs
- Marketing tool configurations

### Manual Deployment
From the `promo-site` directory:
```bash
vercel --prod
```

### Automatic Deployment
The project has `vercel.json` configured to only deploy when files in the `promo-site/` directory change. Pushing to the `main` branch will trigger automatic deployment.

## 📁 Project Structure

```
promo-site/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utilities and helpers
│   ├── i18n/          # Translations
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript config
├── tailwind.config.js # Tailwind config
├── vercel.json        # Vercel deployment config
└── package.json       # Dependencies
```

## 🎨 Styling

The site uses TailwindCSS with custom configuration. Component variants are managed using Class Variance Authority (CVA) for consistent, reusable component patterns.

## 🌍 Internationalization

The application supports:
- Portuguese (pt) - Default
- English (en)

Translations are managed using i18next and stored in `src/i18n/`.

## 🧪 Linting

```bash
npm run lint
```

## 📝 Notes

- This is part of a monorepo. See the [root README](../README.md) for the complete project overview.
- The promo site is designed to be lightweight and fast-loading for optimal marketing performance.
- Consider adding analytics, SEO optimization, and conversion tracking for marketing campaigns.
- All changes should be tested locally before deploying to production.
