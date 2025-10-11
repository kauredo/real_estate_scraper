# MyAgentWebsite.com - Promotional Website

The marketing and promotional website for MyAgentWebsite.com, built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Overview

This is the public-facing promotional website that markets the MyAgentWebsite platform to potential customers (real estate agents).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel (will be deployed to myagentwebsite.com)

## Pages

- **/** - Homepage with hero section, key benefits, features overview, and CTA
- **/features** - Detailed feature showcase
- **/pricing** - Pricing tiers (Starter $49, Professional $99, Enterprise Custom)
- **/about** - About page with mission, vision, and story
- **/contact** - Contact form for demo requests and inquiries

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
promo-site/
├── app/
│   ├── page.tsx              # Homepage
│   ├── features/
│   │   └── page.tsx          # Features page
│   ├── pricing/
│   │   └── page.tsx          # Pricing page
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── contact/
│   │   └── page.tsx          # Contact page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # shadcn/ui components
├── lib/
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## Deployment

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Configure environment:
   - **Root Directory**: `promo-site`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
3. Add custom domain: `myagentwebsite.com`
4. Deploy!

## Next Steps

- [ ] Set up DNS records for myagentwebsite.com
- [ ] Deploy to Vercel
- [ ] Connect custom domain
- [ ] Set up form submission handling
- [ ] Add analytics (Plausible or Google Analytics)
- [ ] Implement email service integration

---

**Last Updated**: January 2025
