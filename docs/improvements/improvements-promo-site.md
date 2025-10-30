# Promo Site Improvements & Requirements

**Last Updated:** October 30, 2025
**Application:** Marketing/Promotional Website (`/promo-site`)
**Current Status:** Core pages built, needs Phase 1 & 2 completion (NO blog/newsletter features)
**Tech Stack:** Vite + React + TypeScript + Tailwind CSS
**Purpose:** SaaS product marketing website for MyAgentWebsite.com

### ✅ Completed So Far
- ✅ All core pages: Home, Features, Pricing, About, Contact, Privacy Policy, Terms of Service
- ✅ Case Studies page with Sofia Galvão Group featured
- ✅ Help Center page with link to Notion documentation
- ✅ Full internationalization (EN/PT) with modular translation structure
- ✅ SEO optimization with Edge Middleware for social media crawlers
- ✅ SEO meta data fully extracted to translation files
- ✅ Client-side SEO component using translations
- ✅ Comprehensive fallback meta tags in index.html
- ✅ Cookie consent banner (GDPR compliant)
- ✅ Sitemap.xml and robots.txt (updated with new pages)
- ✅ Legal pages with proper translations
- ✅ Footer with legal links
- ✅ Localized routing (/en/ and /pt/) with proper SEO

### 🚧 Next Steps
- Demo booking integration (UI placeholder exists, needs Calendly/Cal.com integration)
- Contact form email delivery (form exists, needs backend integration)
- Google Analytics integration
- Performance optimization (Lighthouse score improvement)
- Screenshot/image content creation

---

## 🔧 DEVELOPMENT PATTERNS & STANDARDS

### Adding New Pages

When adding new pages to the promo-site, follow this pattern:

#### 1. Create Page Component
Create the React component in `/promo-site/src/pages/{PageName}.tsx`

#### 2. Add Translations
- Create `/promo-site/src/locales/en/{page_name}.json` with English translations
- Create `/promo-site/src/locales/pt/{page_name}.json` with Portuguese translations
- Update `/promo-site/src/locales/en/index.ts` to import and spread the new translation file:
  ```typescript
  import pageName from './page_name.json';

  export default {
    ...translation,
    ...pageName, // Add this line
  };
  ```
- Update `/promo-site/src/locales/pt/index.ts` the same way
- Use translation keys in the component: `t('pageKey.sectionKey.textKey')`

#### 3. Add SEO Translations
- Update `/promo-site/src/locales/en/seo.json` to add SEO data:
  ```json
  {
    "seo": {
      "newPage": {
        "title": "Page Title",
        "description": "Page description for social sharing",
        "keywords": "relevant, keywords, here"
      }
    }
  }
  ```
- Update `/promo-site/src/locales/pt/seo.json` with Portuguese translations
- This ensures proper Open Graph tags for Facebook, Twitter, LinkedIn, WhatsApp, etc.

#### 4. Add Client-Side SEO Component
- Import and use the SEO component in the page:
  ```typescript
  import { SEO } from '../components/SEO';

  return (
    <>
      <SEO page="newPage" />
      {/* Page content */}
    </>
  );
  ```
- The component automatically loads SEO data from translations
- This updates meta tags for regular users (not needed for crawlers since middleware handles it)
- Also update the SEO component's page type union in `/promo-site/src/components/SEO.tsx`

#### 5. Update Edge Middleware SEO Mapping
- Update `/promo-site/lib/metaTagsGenerator.ts` to map the new route:
  ```typescript
  const PATH_TO_KEY_MAP: Record<string, string> = {
    '/new-page': 'newPage',
    // ... other pages
  };

  const KEY_TO_TYPE_MAP: Record<string, string> = {
    'newPage': 'website', // or 'article'
    // ... other pages
  };
  ```
- This ensures the Edge Middleware can load the correct SEO data from translations

#### 6. Add Route
- Update `/promo-site/src/App.tsx` to add the new route for both English and Portuguese:
  ```typescript
  // English routes (no prefix)
  <Route path="/new-page" element={<NewPage />} />

  // Portuguese routes (/pt prefix)
  <Route path="/pt/new-page" element={<NewPage />} />
  ```

#### 7. Update Sitemap
- Add the new page to `/promo-site/public/sitemap.xml` for both languages with proper hreflang tags

### Current SEO Architecture

**Two-Layer Approach:**

1. **Server-Side (Edge Middleware)** - `/promo-site/middleware.ts`
   - Detects social media crawlers (Facebook, Twitter, LinkedIn, WhatsApp, etc.)
   - Injects meta tags from `metaTagsGenerator.ts` before HTML is sent
   - Ensures proper social sharing with Open Graph and Twitter Cards
   - Zero performance impact for regular users

2. **Client-Side (SEO Component)** - `/promo-site/src/components/SEO.tsx`
   - Updates meta tags via JavaScript for regular users
   - Useful for user experience and non-crawler scenarios
   - Works with SPA routing

### Translation Structure

```
/promo-site/src/locales/
├── en/
│   ├── index.ts          # Exports all English translations
│   ├── translation.json  # Main site translations (nav, footer, common)
│   ├── seo.json          # SEO meta data for all pages
│   ├── privacy.json      # Privacy Policy page
│   ├── terms.json        # Terms of Service page
│   ├── cookies.json      # Cookie consent banner
│   ├── caseStudies.json  # Case Studies page
│   ├── help.json         # Help Center page
│   └── {page}.json       # Additional pages
└── pt/
    ├── index.ts          # Exports all Portuguese translations
    ├── translation.json  # Main site translations (nav, footer, common)
    ├── seo.json          # SEO meta data for all pages
    ├── privacy.json      # Privacy Policy page
    ├── terms.json        # Terms of Service page
    ├── cookies.json      # Cookie consent banner
    ├── caseStudies.json  # Case Studies page
    ├── help.json         # Help Center page
    └── {page}.json       # Additional pages
```

**Benefits of this structure:**
- Maintainable: Each page/feature has its own translation file
- Scalable: Easy to add new pages without bloating a single file
- Organized: Clear separation of concerns
- SEO-friendly: All SEO meta data centralized in seo.json for easy management

---

## 🎯 PURPOSE & GOALS

### Primary Purpose
Market and sell the MyAgentWebsite.com SaaS platform to real estate agents and small agencies.

### Key Goals
1. **Generate leads** - Capture interested agent contact information
2. **Educate prospects** - Explain features and benefits clearly
3. **Build credibility** - Showcase social proof and success stories
4. **Drive conversions** - Get signups or demo requests
5. **Support sales** - Provide resources for word-of-mouth selling

### Target Audience
- Individual real estate agents (primary)
- Small boutique agencies (2-10 agents)
- Real estate coaches/trainers (partners)

---

## 📄 REQUIRED PAGES

### 1. Homepage

**Purpose:** First impression, value proposition, drive exploration

**Sections:**
- [ ] **Hero Section**
  - Compelling headline: "The Modern Website Platform for Ambitious Real Estate Agents"
  - Sub-headline: "Create a professional real estate website in minutes, not months"
  - CTA buttons: "Start Free Trial" + "Watch Demo"
  - Hero image/video: Platform screenshot or agent using the platform
  - Trust indicators: "Join 100+ agents" or "Trusted by agents in Portugal"

- [ ] **Problem Statement**
  - "Stop losing leads to marketplace profiles"
  - "Build your personal brand, not theirs"
  - Pain points visualization

- [ ] **Solution Overview**
  - 3-4 key benefits with icons
  - "Professional website in 1 hour"
  - "No coding required"
  - "Start at €49/month"
  - "Your brand, your domain"

- [ ] **Feature Highlights** (top 6 features)
  - Property listings management
  - Testimonials & reviews
  - Lead capture forms
  - Custom domain support
  - Mobile-responsive
  - SEO optimized

- [ ] **How It Works** (3-step process)
  - Step 1: Sign up and choose template
  - Step 2: Add your listings and content
  - Step 3: Go live with your custom domain
  - Each step with illustration

- [ ] **Social Proof Section**
  - Testimonials (3-5 from beta testers)
  - Success metrics: "2x more leads", "70% faster setup"
  - Case study preview (Sofia Galvão Group)

- [ ] **Live Demo/Screenshots**
  - Interactive preview or screenshot carousel
  - Show both admin panel and public website

- [ ] **Pricing Teaser**
  - "Simple, transparent pricing"
  - Starting at €49/month
  - Link to full pricing page

- [ ] **FAQ Preview** (3-5 most common questions)

- [ ] **Final CTA**
  - "Ready to grow your real estate business?"
  - "Start your free 14-day trial"
  - "No credit card required"

### 2. Features Page

**Purpose:** Detailed feature breakdown

**Sections:**
- [ ] **Hero**
  - "Everything you need to succeed online"

- [ ] **Feature Categories**
  - **Website Management**
    - Property listings (unlimited on Pro plan)
    - Automatic photo galleries
    - Property complexes/developments
    - Advanced search & filters
    - Interactive maps
    - Testimonials & reviews showcase
    - Multi-language support (PT/EN)

  - **Lead Generation**
    - Contact forms
    - Property inquiry forms
    - Lead notifications
    - Email integration
    - Call-to-action buttons

  - **Marketing Tools**
    - SEO-optimized pages
    - Open Graph tags
    - Social media sharing
    - Google Analytics integration
    - Facebook Pixel support

  - **Mobile Experience**
    - Fully responsive design
    - Mobile-optimized admin
    - Touch-friendly interface

  - **Customization**
    - Custom domain support
    - Brand colors
    - Logo upload
    - Template selection
    - Page customization

- [ ] **Feature Comparison Table**
  - MyAgentWebsite vs Custom Development vs Wix vs WordPress

- [ ] **CTA**
  - "See it in action"
  - "Book a demo"

### 3. Pricing Page

**Purpose:** Convert visitors to paying customers

**Sections:**
- [ ] **Hero**
  - "Simple, transparent pricing"
  - "No hidden fees"
  - Toggle: Monthly / Yearly (save 20%)

- [ ] **Pricing Tiers** (3 columns)

  **Starter - €49/month**
  - Your professional website
  - Up to 100 active listings
  - Testimonials & reviews
  - Contact forms & lead capture
  - Email support
  - Subdomain (yourname.myagentwebsite.com)
  - Mobile responsive
  - Analytics integration

  **Professional - €99/month** ⭐ MOST POPULAR
  - Everything in Starter
  - Unlimited listings
  - Custom domain (yourname.com)
  - Priority email support
  - Advanced analytics
  - Remove "Powered by" branding
  - Google My Business integration
  - Multi-language support
  - API access

  **Enterprise - Custom**
  - Everything in Professional
  - Multiple agent websites
  - White-label solution
  - Dedicated account manager
  - Custom integrations
  - SLA guarantee
  - Premium support (phone + email)
  - Custom development
  - Training & onboarding

- [ ] **Feature Comparison Table**
  - All features with checkmarks per plan

- [ ] **FAQ Section**
  - "Can I switch plans?"
  - "What payment methods do you accept?"
  - "Is there a free trial?"
  - "Can I cancel anytime?"
  - "Do you offer refunds?"

- [ ] **Trust Signals**
  - "14-day money back guarantee"
  - "No credit card required for trial"
  - "Cancel anytime"

- [ ] **CTA**
  - "Start your free trial"
  - "Book a demo"

### 4. About Page

**Purpose:** Build trust and tell the story

**Sections:**
- [ ] **Mission Statement**
  - "Empowering real estate agents to own their digital presence"

- [ ] **The Problem**
  - "We noticed agents were struggling with..."
  - Expensive developers
  - Complex platforms
  - Generic marketplaces

- [ ] **The Solution**
  - "So we built MyAgentWebsite.com"
  - Purpose-built for real estate
  - Easy to use
  - Affordable

- [ ] **Our Story**
  - Founded by [Your Name]
  - Background in [your background]
  - Built for Sofia Galvão Group first
  - Decided to make it available to all agents

- [ ] **Values**
  - Agent-first approach
  - Transparency
  - Continuous improvement
  - Customer success

- [ ] **Team** (optional if solo)
  - Founder photo and bio
  - Or "Built by real estate technology experts"

- [ ] **CTA**
  - "Join our community of successful agents"

### 5. Case Studies / Success Stories

**Purpose:** Provide social proof

**Sections:**
- [ ] **Hero**
  - "Real agents, real results"

- [ ] **Featured Case Study: Sofia Galvão Group**
  - Agent photo and name
  - Location: Porto, Portugal
  - Challenge: Needed professional website quickly
  - Solution: Built with MyAgentWebsite.com
  - Results:
    - Live in 2 weeks (vs 3 months estimated)
    - Professional brand presence
    - Lead capture system
    - Blog for SEO
  - Quote: "..."
  - Screenshots of website

- [ ] **Additional Success Stories** (3-5)
  - Short format: Photo, name, quote, key result
  - Mix of individual agents and small agencies

- [ ] **Results Metrics** (if available)
  - Average time to launch: 1 week
  - Average lead increase: 2x
  - Customer satisfaction: 4.9/5

- [ ] **CTA**
  - "Join these successful agents"
  - "Start your free trial"

### 6. Contact / Demo Request

**Purpose:** Capture leads and enable sales conversations

**Sections:**
- [ ] **Hero**
  - "Let's talk about growing your business"
  - Or "See MyAgentWebsite.com in action"

- [ ] **Contact Form**
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Company/Agency name (optional)
  - Message
  - "I'm interested in:" (checkbox)
    - Free trial
    - Live demo
    - Pricing information
    - Partnership opportunities
  - CAPTCHA (hCaptcha or reCAPTCHA)
  - Submit button: "Send Message"

- [ ] **Alternative Contact Methods**
  - Email: hello@myagentwebsite.com
  - Phone: [Your phone number]
  - WhatsApp: [Link]
  - Social media links

- [ ] **Calendar Integration**
  - "Or schedule a demo directly"
  - Embedded Calendly or Cal.com widget

- [ ] **Office Location** (if applicable)
  - Address
  - Map embed

- [ ] **Support Resources**
  - Link to documentation
  - Link to FAQ
  - Link to help center

### 7. Documentation / Help Center

**Purpose:** Self-service support, reduce support burden

**Sections:**
- [ ] **Categories**
  - Getting Started
  - Managing Listings
  - Settings & Customization
  - Billing & Account
  - Troubleshooting

- [ ] **Search**
  - Full-text search across all docs
  - Popular searches

- [ ] **Getting Started Guide**
  - Account setup
  - Adding your first listing
  - Customizing your site
  - Connecting your domain
  - Publishing your site

- [ ] **Video Tutorials**
  - Embedded YouTube videos
  - Step-by-step walkthroughs

- [ ] **FAQ Section**
  - Organized by topic
  - Searchable

- [ ] **API Documentation** (if offering API access)
  - Authentication
  - Endpoints
  - Examples
  - SDKs

### 8. Legal Pages

**Required for compliance:**

- [ ] **Privacy Policy**
  - Data collection practices
  - Cookie usage
  - Analytics tracking
  - Data sharing
  - User rights (GDPR)
  - Contact information

- [ ] **Terms of Service / Terms of Use**
  - Service description
  - Account requirements
  - User responsibilities
  - Payment terms
  - Refund policy
  - Termination clause
  - Liability limitations
  - Dispute resolution

- [ ] **Cookie Policy** (if needed)
  - What cookies are used
  - How to control cookies

- [ ] **Acceptable Use Policy**
  - Prohibited activities
  - Content guidelines

---

## 🎨 DESIGN REQUIREMENTS

### Brand Identity

- [ ] **Logo**
  - Primary logo
  - Logo variations (light/dark backgrounds)
  - Favicon

- [ ] **Colors**
  - Primary brand color
  - Secondary color
  - Accent colors
  - Neutral palette
  - Define color usage rules

- [ ] **Typography**
  - Heading font
  - Body font
  - Font weights and sizes
  - Line heights

- [ ] **Visual Style**
  - Professional and modern
  - Clean and minimal
  - Real estate industry appropriate
  - High-quality imagery

### UI Components

- [ ] **Navigation**
  - Desktop header with logo and links
  - Mobile hamburger menu
  - Sticky header
  - CTA button in header

- [ ] **Footer**
  - Links to all main pages
  - Social media links
  - Contact information
  - Legal links
  - Copyright notice

- [ ] **Buttons**
  - Primary CTA button
  - Secondary button
  - Outline button
  - Hover states
  - Loading states

- [ ] **Forms**
  - Text inputs
  - Textarea
  - Select dropdowns
  - Checkboxes
  - Radio buttons
  - Validation states
  - Error messages
  - Success messages

- [ ] **Cards**
  - Feature cards
  - Pricing cards
  - Testimonial cards
  - Case study cards

- [ ] **Icons**
  - Consistent icon set (FontAwesome, Heroicons, or custom)
  - Used for features, benefits, social media

### Imagery

- [ ] **Hero Images/Videos**
  - High-quality hero image or video
  - Platform screenshots
  - Agent success photos

- [ ] **Feature Screenshots**
  - Admin panel screenshots
  - Public website screenshots
  - Mobile screenshots
  - Annotated screenshots

- [ ] **Illustrations** (optional)
  - How it works process
  - Empty states
  - Error pages

- [ ] **Social Proof**
  - Agent testimonial photos
  - Company logos (if partnering with agencies)

---

## ⚙️ TECHNICAL REQUIREMENTS

### SEO Optimization

- [ ] **Meta Tags**
  - Unique title and description per page
  - Open Graph tags
  - Twitter Card tags
  - Structured data (Organization, Product, FAQPage)

- [ ] **Performance**
  - Lighthouse score 90+
  - Fast loading times (<3 seconds)
  - Lazy loading images
  - Code splitting
  - Minified assets

- [ ] **Mobile Optimization**
  - Fully responsive
  - Touch-friendly
  - Mobile-first design

- [ ] **Sitemap & Robots.txt**
  - XML sitemap
  - Robots.txt with sitemap reference

- [ ] **Analytics**
  - Google Analytics 4
  - Event tracking for key actions
  - Conversion tracking

### Functionality

- [ ] **Forms**
  - Contact form with email delivery
  - Demo request form
  - Form validation
  - CAPTCHA (spam prevention)
  - Success/error handling

- [ ] **Cookie Consent**
  - Cookie banner (GDPR compliance)
  - Accept/decline options
  - Cookie preferences management

- [ ] **Live Chat** (optional)
  - Intercom, Drift, or Tawk.to
  - Available during business hours

- [ ] **Booking System**
  - Calendly or Cal.com integration for demo bookings

### Integrations

- [ ] **Analytics**
  - Google Analytics
  - Facebook Pixel (if running ads)
  - Hotjar or Microsoft Clarity (heatmaps)

- [ ] **Email Service**
  - Transactional emails (SendGrid, Resend)
  - Contact form email delivery

- [ ] **CRM** (optional)
  - Send leads to CRM
  - HubSpot, Pipedrive, or similar

- [ ] **Payment** (for trial signup if capturing credit card)
  - Stripe integration
  - PCI compliance

### Deployment

- [ ] **Hosting**
  - Deploy to Vercel
  - Custom domain: myagentwebsite.com
  - SSL certificate (automatic via Vercel)
  - CDN for global performance

- [ ] **Environment Variables**
  - API endpoint (if needed)
  - Analytics IDs
  - Email service keys
  - CRM integration keys

- [ ] **CI/CD**
  - Automatic deployment on push to main
  - Preview deployments for PRs
  - Automated tests (optional)

---

## 🚀 MARKETING FEATURES

### Lead Capture

- [ ] **Forms on Every Page**
  - Homepage: "Start Free Trial"
  - Pricing: "Choose Plan" buttons
  - Features: "Request Demo"
  - Contact: Full contact form
  - Case Studies: "Schedule Demo"

- [ ] **Exit Intent Popup** (optional)
  - Trigger when user moves to leave
  - Offer: "Wait! Get 20% off your first month"
  - Or: "Download our free guide"

- [ ] **Sticky CTA Bar** (optional)
  - Fixed at top or bottom
  - "Start Free Trial" always visible

### Social Proof

- [ ] **Testimonials Throughout**
  - Homepage: 3-5 testimonials
  - Pricing page: Success quotes
  - Features page: Use case testimonials

- [ ] **Trust Badges**
  - "14-day money back guarantee"
  - "No credit card required"
  - "Cancel anytime"
  - "Used by 100+ agents" (update with real numbers)

- [ ] **Live Stats** (optional)
  - "1,234 websites created"
  - "10,000 listings managed"
  - Real-time counter for credibility

### Conversion Optimization

- [ ] **A/B Testing Setup**
  - Test headlines
  - Test CTA button text
  - Test pricing display
  - Test form fields

- [ ] **Heatmaps & Session Recording**
  - Hotjar or Microsoft Clarity
  - Analyze user behavior
  - Identify friction points

- [ ] **Conversion Tracking**
  - Track demo requests
  - Track trial signups
  - Track pricing page visits
  - Track form submissions

---

## 📱 ADDITIONAL PAGES (Optional / Future)

### Partner Program Page

**Purpose:** Recruit affiliates and partners

**Sections:**
- [ ] Program benefits
- [ ] Commission structure
- [ ] Marketing materials
- [ ] Sign up form

### Roadmap Page

**Purpose:** Show future development

**Sections:**
- [ ] Recently released features
- [ ] In development
- [ ] Planned features
- [ ] Request feature form

### Comparison Pages

**Purpose:** SEO and competitive positioning

**Pages:**
- [ ] MyAgentWebsite vs Wix
- [ ] MyAgentWebsite vs WordPress
- [ ] MyAgentWebsite vs Custom Development
- [ ] Feature-by-feature comparison
- [ ] Pros and cons
- [ ] Pricing comparison

### Security & Trust Page

**Purpose:** Address security concerns

**Sections:**
- [ ] Data security measures
- [ ] Privacy commitments
- [ ] Compliance certifications
- [ ] Backup & redundancy
- [ ] Uptime guarantees

### Status Page

**Purpose:** Transparency about service status

**Sections:**
- [ ] Current status (all systems operational)
- [ ] Incident history
- [ ] Scheduled maintenance
- [ ] Subscribe to updates

---

## ✅ PRIORITY CHECKLIST

### Phase 1: MVP (Week 1-2)

**Pages:**
- [x] Homepage (complete with all sections) ✅
- [x] Pricing page ✅
- [x] Contact/Demo request page ✅
- [x] Privacy Policy ✅
- [x] Terms of Service ✅

**Technical:**
- [ ] Deploy to Vercel
- [ ] Set up custom domain
- [ ] Configure Google Analytics (DEFERRED - no external integrations for now)
- [ ] Set up contact form email delivery (DEFERRED - no external integrations for now)
- [x] Add basic SEO (meta tags, sitemap) ✅
  - [x] Created sitemap.xml ✅
  - [x] Created robots.txt ✅
  - [x] Added Edge Middleware for social media crawlers ✅
  - [x] Added client-side SEO component ✅
  - [x] Added meta tags to all pages ✅

**Additional Completed:**
- [x] Cookie consent banner (GDPR compliance) ✅
- [x] Translation system (PT/EN) for all pages ✅
- [x] Legal pages translations ✅
- [x] Footer with legal links ✅

**Design:**
- [x] Finalize brand colors and fonts ✅
- [x] Create logo ✅
- [ ] Take 10 critical screenshots
- [ ] Write all copy

### Phase 2: Content & Credibility (Week 3)

**Pages:**
- [x] Features page (detailed) ✅
- [x] About page ✅
- [x] Case study page (Sofia Galvão Group) ✅
- [x] Help Center page (links to Notion documentation) ✅

**Content:**
- [ ] Record 3-minute demo video
- [ ] Collect 3-5 testimonials (have Sofia Galvão Group testimonial)
- [ ] Create platform demo screenshots/walkthrough

**Technical:**
- [ ] Add structured data (schema.org markup)
- [ ] Optimize performance (Lighthouse 90+)
- [ ] Integrate demo booking system (Calendly/Cal.com) - UI placeholder exists, needs integration
- [ ] Contact form backend integration (form exists, needs email service)

### Phase 3: Scale & Optimize (OUT OF SCOPE - Future)

**Note:** These items are deferred for future consideration

**Pages:**
- [ ] Full documentation site expansion
- [ ] Comparison pages (vs competitors)
- [ ] Partner program page

**Marketing:**
- [ ] Implement A/B testing
- [ ] Add heatmaps/session recording

**Technical:**
- [ ] Implement live chat
- [ ] Add exit intent popup
- [ ] Optimize conversion funnel
- [ ] Set up payment integration (if trial needs CC)

---

## 🎯 SUCCESS METRICS

### Track These KPIs:

**Traffic:**
- [ ] Monthly visitors
- [ ] Traffic sources (organic, paid, referral)
- [ ] Bounce rate
- [ ] Average session duration

**Engagement:**
- [ ] Pages per session
- [ ] Scroll depth
- [ ] Video views
- [ ] Documentation page views

**Conversions:**
- [ ] Demo requests
- [ ] Trial signups
- [ ] Contact form submissions
- [ ] Conversion rate (visitor to lead)

**Sales:**
- [ ] Trial to paid conversion rate
- [ ] Monthly recurring revenue (MRR)
- [ ] Customer acquisition cost (CAC)
- [ ] Lifetime value (LTV)

---

## 📝 COPYWRITING GUIDELINES

### Tone of Voice
- **Professional** but not stuffy
- **Friendly** and approachable
- **Confident** without being arrogant
- **Clear** and jargon-free
- **Action-oriented** (focus on results)

### Key Messages
1. "Build your brand, not theirs" (vs marketplaces)
2. "Professional website in minutes, not months"
3. "Start at €49/month - no hidden fees"
4. "No coding required"
5. "Purpose-built for real estate agents"

### Call-to-Actions
- Primary: "Start Free Trial"
- Secondary: "Watch Demo" / "Book Demo"
- Tertiary: "Learn More" / "See Features"

---

## 🎉 RECENT IMPLEMENTATION (October 30, 2025)

### What Was Completed

#### 1. SEO Refactoring to Use Translations
- **Extracted all SEO meta data** from hardcoded constants into translation files
- Created `/promo-site/src/locales/en/seo.json` and `/promo-site/src/locales/pt/seo.json`
- Updated `/promo-site/lib/metaTagsGenerator.ts` to load SEO data from translations
- Refactored `/promo-site/src/components/SEO.tsx` to use single `page` prop instead of individual props
- Updated all 7+ pages to use new simplified API: `<SEO page="home" />`
- Enhanced `/promo-site/index.html` with comprehensive fallback meta tags

**Benefits:**
- All SEO content now centralized in translation files
- Easy to update SEO without touching code
- Consistent approach across all pages
- Better maintainability and scalability

#### 2. Localized Routing Improvements
- Updated Edge Middleware to properly detect `/pt` and `/pt/*` paths
- Fixed meta tag injection to remove duplicate canonical and hreflang links
- Ensured both server-side (middleware) and client-side (SEO component) generate proper hreflang tags
- All pages now have proper canonical and alternate language links

#### 3. Case Studies Page
- Created full Case Studies page featuring Sofia Galvão Group
- Includes challenge, solution, and quantified results:
  - 2 weeks to launch (vs 3+ months estimated)
  - €10,000+ cost savings
  - Professional brand presence achieved
- Added testimonial quote from Sofia Galvão
- Full translations in English and Portuguese
- Routes: `/case-studies` and `/pt/case-studies`

#### 4. Help Center Page
- Created Help Center page with:
  - Hero section
  - Documentation link to Notion (https://www.notion.so/29853081375781e5a730c36cebc01950)
  - 4 help categories (Getting Started, Managing Properties, Customization, Billing & Account)
  - Support contact info (email and contact form link)
- Full translations in English and Portuguese
- Routes: `/help` and `/pt/help`

#### 5. Updated Infrastructure
- Updated sitemap.xml with new pages (both EN and PT versions)
- Updated metaTagsGenerator.ts PATH_TO_KEY_MAP with new pages
- Updated App.tsx with routes for case-studies and help
- Updated both locale index files to import new translation files

### What's Still Missing

#### Critical Integrations (Needed for Production)
1. **Contact Form Backend**
   - Form UI exists and looks good
   - Needs email service integration (SendGrid, Resend, or similar)
   - Needs server-side endpoint to handle form submissions
   - Needs CAPTCHA integration (hCaptcha or reCAPTCHA)

2. **Demo Booking Integration**
   - "Book Demo" / "Watch Demo" buttons exist throughout site
   - Needs Calendly or Cal.com integration
   - Could be embedded modal or redirect to booking page

3. **Google Analytics**
   - No analytics tracking currently implemented
   - Need GA4 property setup
   - Need to add tracking code and event tracking

#### Content Needs
1. **Screenshots & Images**
   - Need professional screenshots of the platform
   - Need admin panel screenshots
   - Need public website examples
   - Need hero images/videos

2. **Additional Testimonials**
   - Currently have Sofia Galvão Group
   - Need 3-5 more diverse testimonials
   - Need photos of agents/clients

3. **Demo Video**
   - Need 2-3 minute platform walkthrough video
   - Could be embedded on homepage and features page

#### Technical Optimizations
1. **Performance Optimization**
   - Need to run Lighthouse audit
   - Optimize images (lazy loading, WebP format)
   - Code splitting and bundle optimization
   - Target 90+ Lighthouse score

2. **Structured Data (Schema.org)**
   - Add Organization schema
   - Add Product schema for pricing
   - Add FAQPage schema
   - Add BreadcrumbList schema

3. **Advanced SEO**
   - Open Graph images for social sharing
   - Twitter Card images
   - LinkedIn preview optimization

#### Optional/Future Enhancements
1. **A/B Testing Setup** (Deferred to Phase 3)
2. **Live Chat Integration** (Deferred to Phase 3)
3. **Exit Intent Popup** (Deferred to Phase 3)
4. **Heatmaps/Session Recording** (Deferred to Phase 3)

### Current State Summary

**What Works:**
- All core pages are fully functional with proper translations
- SEO foundation is solid (meta tags, sitemap, robots.txt, hreflang)
- Cookie consent is GDPR compliant
- UI/UX is complete and responsive
- Case studies and help center are live

**What's Blocking Launch:**
- Contact form needs backend integration
- Demo booking needs integration
- Content (images, screenshots, videos) needs to be created
- Analytics needs to be set up

**Estimated Time to Production:**
- Critical integrations: 2-3 days
- Content creation: 1-2 weeks (depends on photo shoots, video recording)
- Performance optimization: 1-2 days
- Total: ~2-3 weeks with focused effort

---

**Next Review:** November 28, 2025
