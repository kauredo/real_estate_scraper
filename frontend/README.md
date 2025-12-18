# Frontend - Main Customer Website

The main customer-facing website for the Sofia Galvao Group real estate platform. This application allows customers to browse property listings, read blog posts, join the club, and contact the agency.

## 🎯 Purpose

This is the primary customer interface that provides:

- Property listing browsing and search
- Detailed property information
- Blog and club stories
- Contact forms
- Newsletter subscriptions
- Club membership signup
- Multilingual support (PT/EN)

## 🛠️ Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **Axios** - API communication
- **i18next** - Internationalization (PT/EN)
- **React Slick** - Image carousels
- **React Share** - Social media sharing
- **React CountUp** - Animated counters
- **FontAwesome** - Icons

## 🚀 Development

### Prerequisites

- Node.js 22.x (see root `.nvmrc`)
- Backend API running (see root `README.md`)

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

For production deployment on Vercel, set this in the project environment variables.

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

You can also run from the root directory:

```bash
npm run dev  # Starts API + Jobs + Frontend
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

This application is deployed to **Vercel** as the "sgg" project.

### Vercel Configuration

**Important**: The project must be configured with the correct **Root Directory**:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the sgg project → Settings → General
3. Set **Root Directory** to: `frontend`
4. Framework Preset: Vite
5. Build Command: `vite build`
6. Output Directory: `dist`
7. Install Command: `npm install`

### Environment Variables on Vercel

Set these in the Vercel project settings:

- `VITE_API_URL` - Production API URL (e.g., `https://api.yourdomain.com/api/v1`)

### Manual Deployment

From the `frontend` directory:

```bash
vercel --prod
```

### Automatic Deployment

The project has `vercel.json` configured to only deploy when files in the `frontend/` directory change. Pushing to the `main` branch will trigger automatic deployment.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom React hooks
│   ├── i18n/          # Translations
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
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

## 🎨 Features

### Property Listings

- Browse all available properties
- Filter by type, price, location
- View detailed property information
- Image galleries with zoom
- Share properties on social media

### Content

- Blog posts with rich content
- Club stories and member testimonials
- FAQ section
- About and services pages

### User Interactions

- Contact forms
- Newsletter subscription
- Club membership signup
- Property inquiries

## 🌍 Internationalization

The application supports:

- Portuguese (pt) - Default
- English (en)

Language selection persists across sessions. Translations are managed using i18next and stored in `src/i18n/`.

## 🧪 Linting

```bash
npm run lint
```

## 🔍 SEO Considerations

- Dynamic meta tags per page
- Open Graph tags for social sharing
- Structured data for properties
- Semantic HTML markup

## 📝 Notes

- This is part of a monorepo. See the [root README](../README.md) for the complete project overview.
- The frontend communicates with the Rails API for all data.
- Images are served from Cloudinary CDN for optimal performance.
- All changes should be tested locally before deploying to production.

## 🐛 Troubleshooting

### API Connection Issues

Ensure the `VITE_API_URL` environment variable is set correctly and the API is running.

### Build Errors

If you encounter build errors:

1. Clear node_modules: `rm -rf node_modules package-lock.json`
2. Reinstall dependencies: `npm install`
3. Try building again: `npm run build`

### Development Server Not Starting

Check that port 5173 is not already in use. You can change the port in `vite.config.ts` if needed.
