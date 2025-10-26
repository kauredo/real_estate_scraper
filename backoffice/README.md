# Backoffice - Admin Dashboard

The administrative dashboard for the Sofia Galvao Group real estate platform. This application allows administrators to manage listings, blog posts, club stories, testimonials, and other content.

## 🎯 Purpose

This is an internal admin tool that provides a user interface for:
- Managing property listings
- Creating and editing blog posts
- Managing club stories
- Configuring site variables
- Managing testimonials
- Uploading and organizing media

## 🛠️ Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **Axios** - API communication
- **i18next** - Internationalization (PT/EN)
- **TinyMCE** - Rich text editor
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
2. Navigate to the backoffice project → Settings → General
3. Set **Root Directory** to: `backoffice`
4. Framework Preset: Vite
5. Build Command: `vite build`
6. Output Directory: `dist`
7. Install Command: `npm install`

### Environment Variables on Vercel
Set these in the Vercel project settings:
- `VITE_API_URL` - Production API URL (e.g., `https://api.yourdomain.com/api/v1`)

### Manual Deployment
From the `backoffice` directory:
```bash
vercel --prod
```

### Automatic Deployment
The project has `vercel.json` configured to only deploy when files in the `backoffice/` directory change. Pushing to the `main` branch will trigger automatic deployment.

## 📁 Project Structure

```
backoffice/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── contexts/      # React contexts
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

## 🔒 Authentication

The backoffice requires JWT authentication. Users must log in with admin credentials obtained from the API. The token is stored in localStorage and included in all API requests.

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
- The backoffice communicates with the same Rails API used by the main frontend.
- All changes should be tested locally before deploying to production.
