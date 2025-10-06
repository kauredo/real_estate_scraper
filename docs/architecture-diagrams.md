# Architecture Diagrams

## System Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          REAL ESTATE PLATFORM                               │
│                        Multi-Tenant SaaS Architecture                       │
└────────────────────────────────────────────────────────────────────────────┘

                                    CLIENTS
                                       ↓

┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   SGG Public Site   │    │ New Agency Site     │    │  Another Agency...  │
│   (Vercel)          │    │ (Vercel)            │    │  (Vercel)           │
│                     │    │                     │    │                     │
│  sofiagalvaogroup   │    │  newagency.com      │    │  agency3.com        │
│  .com               │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
         │                           │                           │
         │ X-API-Key: SGG_KEY        │ X-API-Key: NEW_KEY        │ X-API-Key: AG3_KEY
         └───────────────────────────┴───────────────────────────┘
                                    │
                                    ↓
                        ┌───────────────────────┐
                        │   TENANT MIDDLEWARE   │
                        │  (Identifies Tenant)  │
                        └───────────────────────┘
                                    │
                                    ↓
        ┌───────────────────────────────────────────────────────┐
        │              RAILS API BACKEND                        │
        │           (Railway - api.yourdomain.com)              │
        ├───────────────────────────────────────────────────────┤
        │                                                       │
        │  ┌─────────────────┐        ┌─────────────────┐     │
        │  │ Public API      │        │  Admin API      │     │
        │  │ /api/v1/        │        │  /api/v1/admin/ │     │
        │  │                 │        │                 │     │
        │  │ - listings      │        │ - listings      │     │
        │  │ - blog_posts    │        │ - blog_posts    │     │
        │  │ - testimonials  │        │ - testimonials  │     │
        │  └─────────────────┘        └─────────────────┘     │
        │                                                       │
        │  ┌──────────────────────────────────────────┐       │
        │  │       Super Admin API                    │       │
        │  │       /api/v1/super_admin/               │       │
        │  │                                          │       │
        │  │  - tenants (CRUD)                        │       │
        │  │  - analytics (cross-tenant)              │       │
        │  │  - feature flags management              │       │
        │  └──────────────────────────────────────────┘       │
        └───────────────────────────────────────────────────────┘
                                    │
                                    ↓
                        ┌───────────────────────┐
                        │   POSTGRESQL DATABASE │
                        │  (Multi-Tenant Data)  │
                        └───────────────────────┘


                            ADMIN ACCESS
                                ↓
                    ┌───────────────────────┐
                    │  ADMIN BACKOFFICE     │
                    │  (Unified CMS)        │
                    │  admin.yourdomain.com │
                    ├───────────────────────┤
                    │  - Super Admin UI     │
                    │  - Tenant Admin UI    │
                    │  - Analytics          │
                    └───────────────────────┘
                            │
                            │ JWT Token + Role
                            ↓
                    Rails API (Admin/SuperAdmin endpoints)
```

## Data Flow: Public API Request

```
┌─────────────────────────────────────────────────────────────────┐
│  1. User visits SGG website and clicks "View Listings"          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. Frontend makes API request                                   │
│                                                                  │
│     GET https://api.yourdomain.com/api/v1/listings              │
│     Headers:                                                     │
│       X-API-Key: abc123...SGG_API_KEY                           │
│       Content-Type: application/json                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. Request hits TenantMiddleware                                │
│                                                                  │
│     - Extracts API key from header                              │
│     - Looks up Tenant by api_key                                │
│     - Sets Current.tenant = sgg_tenant                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. Request reaches ListingsController                           │
│                                                                  │
│     - verify_tenant checks Current.tenant exists                │
│     - Queries: Listing.all                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. Model applies default_scope                                  │
│                                                                  │
│     Listing.all becomes:                                        │
│     SELECT * FROM listings                                      │
│     WHERE tenant_id = 1  -- SGG's tenant_id                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  6. Response sent back to frontend                               │
│                                                                  │
│     {                                                           │
│       "listings": [/* Only SGG's listings */],                  │
│       "pagination": {...}                                       │
│     }                                                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  7. Frontend displays listings                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow: Feature Flag Check

```
┌─────────────────────────────────────────────────────────────────┐
│  User requests Blog Posts (feature flag: blog_enabled)          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  GET /api/v1/blog_posts                                          │
│  X-API-Key: NEW_AGENCY_KEY                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Middleware: Current.tenant = new_agency_tenant                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  BlogPostsController                                             │
│                                                                  │
│    before_action -> { require_feature!(:blog) }                 │
│                                                                  │
│    def require_feature!(feature)                                │
│      unless Current.tenant.blog_enabled == true                 │
│        return 404 Not Found                                     │
│      end                                                        │
│    end                                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────┐
                    │ blog_enabled?   │
                    └─────────────────┘
                         ↙         ↘
                    YES               NO
                     ↓                 ↓
         ┌─────────────────┐   ┌──────────────┐
         │ Return blog     │   │ Return 404   │
         │ posts           │   │ Not Found    │
         └─────────────────┘   └──────────────┘
```

## Database Schema: Multi-Tenant

```
┌────────────────────────────────────────────────────────────────┐
│                         TENANTS TABLE                           │
├────────────────────────────────────────────────────────────────┤
│  id             │ integer    │ Primary Key                     │
│  name           │ string     │ "Sofia Galvao Group"            │
│  slug           │ string     │ "sgg" (unique)                  │
│  api_key        │ string     │ "abc123..." (unique)            │
│  features       │ jsonb      │ { blog_enabled: true, ... }     │
│  domain         │ string     │ "sofiagalvaogroup.com"          │
│  active         │ boolean    │ true                            │
└────────────────────────────────────────────────────────────────┘
                              │
                              │ has_many
                              ↓
┌────────────────────────────────────────────────────────────────┐
│                        LISTINGS TABLE                           │
├────────────────────────────────────────────────────────────────┤
│  id             │ integer    │ Primary Key                     │
│  tenant_id      │ integer    │ Foreign Key → tenants.id        │
│  title          │ string     │                                 │
│  description    │ text       │                                 │
│  price_cents    │ integer    │                                 │
│  status         │ integer    │                                 │
│  ...            │            │                                 │
│                                                                 │
│  default_scope { where(tenant_id: Current.tenant&.id) }        │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                      BLOG_POSTS TABLE                           │
├────────────────────────────────────────────────────────────────┤
│  id             │ integer    │ Primary Key                     │
│  tenant_id      │ integer    │ Foreign Key → tenants.id        │
│  title          │ string     │                                 │
│  text           │ text       │                                 │
│  ...            │            │                                 │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                        ADMINS TABLE                             │
├────────────────────────────────────────────────────────────────┤
│  id             │ integer    │ Primary Key                     │
│  tenant_id      │ integer    │ Foreign Key (nullable)          │
│  email          │ string     │                                 │
│  role           │ integer    │ 0=tenant_admin, 1=super_admin   │
│  ...            │            │                                 │
│                                                                 │
│  Super admins have tenant_id = NULL                            │
│  Tenant admins have tenant_id = specific tenant                │
└────────────────────────────────────────────────────────────────┘
```

## Authorization Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ACCESS CONTROL MATRIX                           │
├─────────────────┬──────────────────┬─────────────────┬──────────────────┤
│   Resource      │  Public (No Key) │  Tenant Admin   │  Super Admin     │
├─────────────────┼──────────────────┼─────────────────┼──────────────────┤
│ /listings       │   ❌ 401         │   ✅ Own tenant │   ✅ All tenants │
│ /blog_posts     │   ❌ 401         │   ✅ Own tenant │   ✅ All tenants │
│ /admin/listings │   ❌ 401         │   ✅ Own tenant │   ❌ Not allowed │
│ /super_admin/   │   ❌ 401         │   ❌ 403        │   ✅ Full access │
│   tenants       │                  │                 │                  │
└─────────────────┴──────────────────┴─────────────────┴──────────────────┘

Feature Flag Override:
  - If feature disabled for tenant: 404 Not Found
  - Super admin can still access via unscoped queries
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION ENVIRONMENT                       │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│  VERCEL (Frontend)   │
├──────────────────────┤
│  SGG Site            │ → sofiagalvaogroup.com
│  New Agency Site     │ → newagency.com
│  Admin Backoffice    │ → admin.yourdomain.com
└──────────────────────┘
          ↓
          │ HTTPS
          ↓
┌──────────────────────┐
│  RAILWAY (Backend)   │
├──────────────────────┤
│  Rails API           │ → api.yourdomain.com
│  - Auto-scaling      │
│  - Health checks     │
│  - Zero-downtime     │
└──────────────────────┘
          ↓
┌──────────────────────┐
│  RAILWAY (Database)  │
├──────────────────────┤
│  PostgreSQL          │
│  - Daily backups     │
│  - Point-in-time     │
│    recovery          │
└──────────────────────┘

┌──────────────────────┐
│  CLOUDINARY          │
├──────────────────────┤
│  Image Storage       │
│  - Listings photos   │
│  - Blog images       │
└──────────────────────┘

┌──────────────────────┐
│  SENTRY              │
├──────────────────────┤
│  Error Tracking      │
│  - Tagged by tenant  │
└──────────────────────┘
```

## Admin Backoffice UI Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN BACKOFFICE                              │
│                    (admin.yourdomain.com)                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────┬───────────────────────────────────────────────────────┐
│  SIDEBAR    │              MAIN CONTENT                             │
│             │                                                       │
│  Dashboard  │  ┌──────────────────────────────────────────────┐   │
│  Tenants    │  │                                              │   │
│  Analytics  │  │         SUPER ADMIN VIEW                     │   │
│             │  │                                              │   │
│  ───────    │  │  ┌────────────────────────────────────┐     │   │
│             │  │  │  All Tenants                       │     │   │
│  Listings   │  │  ├────────────────────────────────────┤     │   │
│  Blog       │  │  │  • SGG (Active) - 150 listings     │     │   │
│  Settings   │  │  │  • New Agency (Active) - 45 list.  │     │   │
│             │  │  │  • Test Agency (Inactive) - 0      │     │   │
│  Logout     │  │  └────────────────────────────────────┘     │   │
│             │  │                                              │   │
└─────────────┤  │  ┌────────────────────────────────────┐     │   │
              │  │  │  Cross-Tenant Analytics            │     │   │
              │  │  ├────────────────────────────────────┤     │   │
              │  │  │  📊 Total Listings: 195            │     │   │
              │  │  │  👥 Total Admins: 5                │     │   │
              │  │  │  🏢 Active Tenants: 2              │     │   │
              │  │  └────────────────────────────────────┘     │   │
              │  └──────────────────────────────────────────────┘   │
              │                                                       │
              │  ┌──────────────────────────────────────────────┐   │
              │  │                                              │   │
              │  │         TENANT ADMIN VIEW                    │   │
              │  │         (Scoped to SGG)                      │   │
              │  │                                              │   │
              │  │  ┌────────────────────────────────────┐     │   │
              │  │  │  My Listings (150)                 │     │   │
              │  │  ├────────────────────────────────────┤     │   │
              │  │  │  🏠 Luxury Apartment - Lisbon      │     │   │
              │  │  │  🏡 Villa - Cascais                │     │   │
              │  │  │  ... (only SGG's listings)         │     │   │
              │  │  └────────────────────────────────────┘     │   │
              │  └──────────────────────────────────────────────┘   │
              └───────────────────────────────────────────────────────┘
```

## Feature Flags Configuration

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FEATURE FLAGS PER TENANT                         │
└─────────────────────────────────────────────────────────────────────┘

TENANT: Sofia Galvao Group (SGG)
┌──────────────────────────────┬─────────┬──────────────────────────┐
│ Feature                      │ Status  │ Effect                   │
├──────────────────────────────┼─────────┼──────────────────────────┤
│ blog_enabled                 │   ✅    │ /blog_posts works        │
│ club_enabled                 │   ✅    │ /club/* works            │
│ testimonials_enabled         │   ✅    │ /testimonials works      │
│ newsletter_enabled           │   ✅    │ /newsletter/* works      │
│ listing_complexes_enabled    │   ✅    │ /listing_complexes works │
└──────────────────────────────┴─────────┴──────────────────────────┘

TENANT: New Agency
┌──────────────────────────────┬─────────┬──────────────────────────┐
│ Feature                      │ Status  │ Effect                   │
├──────────────────────────────┼─────────┼──────────────────────────┤
│ blog_enabled                 │   ✅    │ /blog_posts works        │
│ club_enabled                 │   ❌    │ /club/* returns 404      │
│ testimonials_enabled         │   ✅    │ /testimonials works      │
│ newsletter_enabled           │   ❌    │ /newsletter/* returns 404│
│ listing_complexes_enabled    │   ❌    │ /listing_complexes → 404 │
└──────────────────────────────┴─────────┴──────────────────────────┘

Configuration via:
  - Super Admin UI (recommended)
  - Rails console: tenant.update(blog_enabled: false)
  - API: PATCH /super_admin/tenants/:id
```

## Request/Response Examples

### Example 1: Successful Listing Request

```
REQUEST:
  GET /api/v1/listings
  Headers:
    X-API-Key: abc123...SGG_KEY
    Content-Type: application/json

MIDDLEWARE:
  Current.tenant = Tenant.find_by(api_key: 'abc123...')
  # => <Tenant id: 1, name: "Sofia Galvao Group">

CONTROLLER:
  verify_tenant → passes ✅
  Listing.all → scoped to tenant_id=1

DATABASE QUERY:
  SELECT * FROM listings WHERE tenant_id = 1

RESPONSE:
  {
    "listings": [
      { "id": 1, "title": "Luxury Apartment", "price": "500000", ... },
      { "id": 2, "title": "Villa in Cascais", "price": "1200000", ... }
    ],
    "pagination": { "total": 150, "page": 1, ... }
  }
```

### Example 2: Feature Disabled

```
REQUEST:
  GET /api/v1/club_stories
  Headers:
    X-API-Key: xyz789...NEW_AGENCY_KEY

MIDDLEWARE:
  Current.tenant = new_agency
  # club_enabled = false

CONTROLLER:
  before_action -> { require_feature!(:club) }
  # Checks: new_agency.club_enabled → false

RESPONSE:
  {
    "error": "Not Found"
  }
  Status: 404
```

### Example 3: Super Admin Access

```
REQUEST:
  GET /api/v1/super_admin/tenants
  Headers:
    Authorization: Bearer <JWT_TOKEN>

CONTROLLER:
  authenticate_admin! → @current_admin
  require_super_admin! → checks role == 'super_admin'
  # Bypasses tenant scoping

RESPONSE:
  [
    {
      "id": 1,
      "name": "Sofia Galvao Group",
      "listings_count": 150,
      "active": true
    },
    {
      "id": 2,
      "name": "New Agency",
      "listings_count": 45,
      "active": true
    }
  ]
```

## Summary

These diagrams illustrate:

✅ **Multi-tenant architecture** with row-level isolation
✅ **Feature flags** for flexible feature toggling
✅ **Three-tier admin system** (Public, Tenant Admin, Super Admin)
✅ **Unified backoffice** for centralized management
✅ **Secure authentication** via API keys and JWT
✅ **Scalable deployment** on modern infrastructure

All components work together to create a robust, secure, and scalable multi-tenant real estate platform.
