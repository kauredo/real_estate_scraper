# Real Estate Multi-Tenancy Documentation

## Overview

This documentation describes the complete multi-tenancy architecture for the Real Estate Scraper platform, transforming it from a single-tenant application (SGG) into a scalable multi-tenant SaaS platform.

## Documents

### 1. [Multi-Tenancy Architecture](./multi-tenancy-architecture.md)

**Core architectural decisions and design patterns**

- Why row-level multi-tenancy
- Tenant model and feature flags
- Data isolation strategy
- Request flow and authentication
- Security considerations
- Performance optimization

**Read this first** to understand the overall architecture.

### 2. [Implementation Guide](./multi-tenancy-implementation-guide.md)

**Step-by-step implementation instructions**

- Database migrations
- Model updates (ActsAsTenant concern)
- Middleware setup
- Controller updates with feature flags
- Frontend integration
- Testing strategy
- Complete code examples for each step

**Follow this** to implement multi-tenancy in your codebase.

### 3. [Deployment Procedures](./deployment-procedures.md)

**Production deployment and rollback strategies**

- Pre-deployment checklist
- Zero-downtime deployment strategy
- Production migration in phases
- Rollback procedures
- Monitoring and health checks
- Adding new tenants post-deployment

**Use this** when deploying to production.

### 4. [Super Admin & Unified Backoffice](./super-admin-and-backoffice.md)

**Advanced admin architecture**

- Super admin role and permissions
- Cross-tenant management
- Unified admin backoffice (CMS) architecture
- React-based admin panel design
- Deployment strategy for admin panel

**Reference this** for building the admin management system.

## Quick Start

### For Understanding

1. Read [Multi-Tenancy Architecture](./multi-tenancy-architecture.md)
2. Review architecture diagrams
3. Understand tenant isolation strategy

### For Implementation

1. Follow [Implementation Guide](./multi-tenancy-implementation-guide.md) step-by-step
2. Start with Phase 1 (Database & Models)
3. Test each phase before proceeding
4. Complete all 6 phases

### For Deployment

1. Review [Deployment Procedures](./deployment-procedures.md)
2. Complete pre-deployment checklist
3. Follow production migration phases
4. Keep rollback procedures handy

### For Admin System

1. Read [Super Admin & Backoffice](./super-admin-and-backoffice.md)
2. Implement super admin backend first
3. Build admin backoffice frontend
4. Deploy admin panel separately

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         SYSTEM OVERVIEW                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Public Frontend │       │  Admin Backoffice│       │   Rails API      │
│  (Multi-Tenant)  │       │  (Unified CMS)   │       │   (Backend)      │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ SGG Site         │──────▶│ Super Admin UI   │──────▶│ Multi-Tenant DB  │
│ New Agency Site  │       │ Tenant Admin UI  │       │ + Feature Flags  │
│ Another Agency.. │       │ Analytics        │       │ + API Keys       │
└──────────────────┘       └──────────────────┘       └──────────────────┘
     ↓ X-API-Key               ↓ JWT Token                ↓ Row-Level
     SGG_KEY_123               ADMIN_TOKEN                 tenant_id filter
```

### Components

**1. Rails API Backend** (`/api`)
- Multi-tenant data model
- Feature flag system
- API key authentication
- Super admin endpoints
- Tenant admin endpoints

**2. Public Frontends** (Multiple instances)
- One per tenant (e.g., SGG, New Agency)
- Each has unique API key
- Automatically scoped to tenant data
- Can enable/disable features per tenant

**3. Admin Backoffice** (`/admin-backoffice`)
- React-based CMS
- Super admin: manage all tenants
- Tenant admin: manage own data
- Analytics and reporting
- Feature flag management

## Key Concepts

### Tenant

A **tenant** represents a real estate agency using the platform.

**Properties:**
- Name, slug, domain
- Unique API key for authentication
- Feature flags (JSONB column)
- Metadata (optional configuration)

**Example:**
```ruby
sgg = Tenant.create!(
  name: 'Sofia Galvao Group',
  slug: 'sgg',
  api_key: 'abc123...',
  blog_enabled: true,
  club_enabled: true,
  testimonials_enabled: true
)
```

### Feature Flags

Features can be enabled/disabled per tenant:

| Feature | Description |
|---------|-------------|
| `blog_enabled` | Blog posts and photos |
| `club_enabled` | Club stories, club users (SGG-specific) |
| `testimonials_enabled` | Client testimonials |
| `newsletter_enabled` | Newsletter subscriptions |
| `listing_complexes_enabled` | Enterprise/development listings |

**Usage:**
```ruby
# In controller
before_action -> { require_feature!(:blog) }
```

### Data Isolation

All tenant-scoped models automatically filter by `tenant_id`:

```ruby
# Automatically scoped to Current.tenant
Listing.all  # => Only current tenant's listings

# Bypass scoping (super admin only)
Listing.unscoped.all  # => All listings across all tenants
```

### Roles

**Tenant Admin:**
- Manages data for one tenant only
- Cannot see other tenants
- Standard CRUD operations

**Super Admin:**
- Manages all tenants
- Create/disable tenants
- View cross-tenant analytics
- Configure feature flags

## Implementation Timeline

### Week 1-2: Backend Multi-Tenancy
- [ ] Create Tenant model
- [ ] Add tenant_id to all tables
- [ ] Implement ActsAsTenant concern
- [ ] Update controllers with feature flags
- [ ] Test data isolation

### Week 3: Deployment Preparation
- [ ] Write data migration for SGG
- [ ] Test in staging environment
- [ ] Prepare rollback procedures
- [ ] Update documentation

### Week 4: Production Migration
- [ ] Deploy Phase 1 (tenant_id nullable)
- [ ] Create SGG tenant
- [ ] Migrate existing data
- [ ] Deploy Phase 2 (enforcement)
- [ ] Monitor and verify

### Week 5-6: Super Admin Backend
- [ ] Add role to admins
- [ ] Create super admin endpoints
- [ ] Implement tenant management API
- [ ] Add analytics endpoints

### Week 7-10: Admin Backoffice
- [ ] Set up React project
- [ ] Implement authentication
- [ ] Build super admin UI
- [ ] Build tenant admin UI
- [ ] Deploy admin backoffice

## Testing Strategy

### Unit Tests
```ruby
# Test tenant scoping
test 'listing scoped to tenant' do
  Current.tenant = @tenant
  listing = create(:listing)
  assert_equal @tenant.id, listing.tenant_id
end
```

### Integration Tests
```ruby
# Test cross-tenant isolation
test 'tenant A cannot access tenant B data' do
  get listings_url, headers: { 'X-API-Key' => @tenant_a.api_key }
  assert_not_includes json_response['listings'], @tenant_b_listing
end
```

### Feature Flag Tests
```ruby
# Test feature flags
test 'blog disabled returns 404' do
  @tenant.update(blog_enabled: false)
  get blog_posts_url, headers: { 'X-API-Key' => @tenant.api_key }
  assert_response :not_found
end
```

## Security Checklist

- [ ] API keys stored in environment variables
- [ ] tenant_id validated on all models
- [ ] Default scopes prevent data leakage
- [ ] Super admin requires role check
- [ ] Cross-tenant access blocked
- [ ] SQL injection prevention
- [ ] Rate limiting per tenant
- [ ] Audit logging for sensitive operations

## Adding a New Tenant

**Step 1: Create tenant**
```ruby
Tenant.create!(
  name: 'New Agency',
  slug: 'new-agency',
  domain: 'newagency.com',
  features: { blog_enabled: true, club_enabled: false, ... }
)
```

**Step 2: Update CORS**
```bash
railway variables set CORS_ORIGINS="...,https://newagency.com"
```

**Step 3: Provide client**
- API key
- API base URL
- Documentation

**Step 4: Client deploys frontend**
```bash
VITE_API_KEY=<new_agency_key>
vercel --prod
```

## Monitoring

### Key Metrics
- Tenants count (active/total)
- Listings per tenant
- API requests per tenant
- Error rate per tenant
- Response times

### Logging
```ruby
# All logs tagged with tenant
Rails.logger.info "Processing request for tenant: #{Current.tenant.slug}"
```

### Error Tracking
```ruby
# Sentry tags include tenant info
Sentry.set_tags(tenant_id: Current.tenant.id)
```

## Troubleshooting

### "Invalid or missing API key"
**Solution:** Ensure `X-API-Key` header is sent with every request.

### No data returned
**Solution:** Check `Current.tenant` is being set by middleware.

### Admin can't log in
**Solution:** Verify admin has `tenant_id` set (or is super admin).

### Performance issues
**Solution:** Check indexes on `tenant_id` columns.

## Next Steps

After completing multi-tenancy implementation:

1. **Build Admin Backoffice** - Unified CMS for managing tenants
2. **Add Analytics** - Per-tenant and cross-tenant reporting
3. **Implement Billing** - Subscription management per tenant
4. **Add Webhooks** - Tenant-specific webhook endpoints
5. **Custom Domains** - Support custom domains per tenant
6. **White Labeling** - Tenant-specific branding

## Resources

### Internal Docs
- [Multi-Tenancy Architecture](./multi-tenancy-architecture.md)
- [Implementation Guide](./multi-tenancy-implementation-guide.md)
- [Deployment Procedures](./deployment-procedures.md)
- [Super Admin & Backoffice](./super-admin-and-backoffice.md)

### External References
- [Rails Multi-Tenancy Guide](https://guides.rubyonrails.org/)
- [ActsAsTenant Gem](https://github.com/ErwinM/acts_as_tenant)
- [Current Attributes](https://api.rubyonrails.org/classes/ActiveSupport/CurrentAttributes.html)

## Support

For questions or issues:
1. Check [Troubleshooting](#troubleshooting) section
2. Review relevant documentation
3. Check implementation guide for step-by-step help

## Version History

- **v1.0** (Current) - Initial multi-tenancy architecture
  - Row-level multi-tenancy
  - Feature flags
  - API key authentication
  - Super admin system
  - Unified backoffice architecture
