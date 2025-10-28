# API Improvements & Enhancements

**Last Updated:** October 28, 2025
**Application:** Rails API Backend (`/api`)
**Current Deployment:** Railway.app

---

## 🚨 CRITICAL FIXES

### 1. Email Configuration

**Issue:** Fallback to `noreply@example.com` when tenant email not configured

**Location:** `/api/app/mailers/new_contact_mailer.rb:21`

```ruby
recipient = Current.tenant&.reply_to_email || Current.tenant&.from_email || ENV.fetch('GMAIL_EMAIL', 'noreply@example.com')
```

**Action Items:**
- [ ] Replace Gmail with proper transactional email service (SendGrid, Resend, or Postmark)
- [ ] Set up custom domain email addresses (hello@, support@, noreply@)
- [ ] Configure SPF, DKIM, DMARC records for email deliverability
- [ ] Update all tenant records with proper `from_email` and `reply_to_email`
- [ ] Test all email flows end-to-end:
  - [ ] Contact form submissions
  - [ ] Newsletter confirmations
  - [ ] Club join requests
  - [ ] Admin notifications

**Environment Variables Needed:**
```bash
# Replace GMAIL_EMAIL with proper service
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
# OR
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### 2. Error Tracking & Monitoring

**Issue:** Sentry configured but DSN not set in production

**Location:** `/api/config/initializers/sentry.rb`

**Action Items:**
- [ ] Create Sentry project and get DSN
- [ ] Add `SENTRY_DSN` to Railway environment variables
- [ ] Configure sample rate for production
- [ ] Set up alerts for critical errors
- [ ] Test error reporting in staging

**Environment Variables:**
```bash
SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ENVIRONMENT=production
```

### 3. Cloudinary Configuration

**Issue:** Need to verify Cloudinary keys are set in production

**Location:** `/api/config/initializers/cloudinary.rb`

**Action Items:**
- [ ] Verify `CLOUDINARY_URL` is set in Railway
- [ ] Configure upload presets
- [ ] Set up folder structure per tenant
- [ ] Enable automatic image optimization
- [ ] Set up CDN delivery optimization

---

## 🔐 SECURITY ENHANCEMENTS

### 1. Rate Limiting

**Status:** Not implemented

**Action Items:**
- [ ] Add rack-attack gem
- [ ] Configure rate limits:
  - [ ] API endpoints: 100 requests per minute per IP
  - [ ] Authentication endpoints: 5 attempts per minute per IP
  - [ ] Contact form: 3 submissions per hour per IP
  - [ ] Newsletter signup: 10 per hour per IP
- [ ] Set up Redis for rate limit storage
- [ ] Configure allowlist for known IPs (monitoring services)
- [ ] Add rate limit headers to responses

**Implementation:**
```ruby
# Gemfile
gem 'rack-attack'

# config/initializers/rack_attack.rb
# - Throttle requests per IP
# - Block suspicious activity
# - Allowlist monitoring services
```

### 2. Additional Security Headers

**Status:** Basic CSP configured, needs enhancement

**Location:** `/api/config/initializers/content_security_policy.rb`

**Action Items:**
- [ ] Add Strict-Transport-Security header
- [ ] Configure X-Frame-Options
- [ ] Add X-Content-Type-Options
- [ ] Configure Referrer-Policy
- [ ] Add Permissions-Policy enhancements
- [ ] Run security audit (Brakeman)

### 3. API Authentication

**Current:** JWT tokens (24-hour expiration), API keys for public frontends

**Improvements:**
- [ ] Add refresh token mechanism for longer sessions
- [ ] Implement API key rotation reminder system
- [ ] Add request signature verification for webhooks
- [ ] Set up IP allowlist option for enterprise clients
- [ ] Add audit logging for sensitive operations

---

## 📊 OBSERVABILITY & MONITORING

### 1. Application Performance Monitoring (APM)

**Status:** Not implemented

**Recommendations:**
- **New Relic** (mentioned in docs but not configured)
- **Scout APM** (Rails-specific, great DX)
- **Skylight** (Simple, Rails-focused)

**Action Items:**
- [ ] Choose APM provider
- [ ] Install and configure gem
- [ ] Set up performance budgets
- [ ] Monitor slow queries (>100ms)
- [ ] Track background job performance
- [ ] Set up alerts for performance degradation

### 2. Uptime Monitoring

**Status:** Not implemented

**Action Items:**
- [ ] Set up UptimeRobot, Pingdom, or Better Uptime
- [ ] Monitor critical endpoints:
  - [ ] `/api/v1/health`
  - [ ] `/api/v1/listings`
  - [ ] `/good_job` (super admin dashboard)
- [ ] Configure alerts (email, SMS, Slack)
- [ ] Set up status page (public or private)

### 3. Database Monitoring

**Action Items:**
- [ ] Enable Railway PostgreSQL metrics
- [ ] Set up slow query logging
- [ ] Monitor connection pool usage
- [ ] Track database size and growth
- [ ] Set up automated backups verification
- [ ] Configure backup retention policy (30 days)

### 4. Background Job Monitoring

**Current:** Good Job dashboard accessible to super admins

**Improvements:**
- [ ] Set up alerts for failed jobs
- [ ] Monitor job queue depth
- [ ] Track job execution time
- [ ] Configure automatic job retry policies
- [ ] Add dead letter queue for permanently failed jobs

---

## 🚀 PERFORMANCE OPTIMIZATIONS

### 1. Database Query Optimization

**Note:** N+1 audit completed (see `/docs/n_plus_one_audit_results.md`)

**Action Items:**
- [ ] Review and implement fixes from N+1 audit
- [ ] Add database indexes:
  - [ ] `listings(tenant_id, status, objective)`
  - [ ] `listings(tenant_id, created_at)`
  - [ ] `blog_posts(tenant_id, hidden)`
  - [ ] `photos(photoable_type, photoable_id)`
- [ ] Implement counter caches where needed
- [ ] Add database query timeout (10 seconds)
- [ ] Enable query plan analysis in development

### 2. Caching Strategy

**Current:** Redis configured

**Action Items:**
- [ ] Implement fragment caching for API responses
- [ ] Add low-level caching for expensive queries
- [ ] Configure cache invalidation strategy
- [ ] Set up cache warming for popular listings
- [ ] Add HTTP caching headers (ETag, Last-Modified)
- [ ] Implement conditional GET support

**Example endpoints to cache:**
```ruby
# Listings index (by search params)
# Individual listings (by ID)
# Blog posts index
# Testimonials
# Variables
```

### 3. API Response Optimization

**Action Items:**
- [ ] Implement JSON response compression (gzip)
- [ ] Add pagination to all list endpoints (already using Pagy, verify consistency)
- [ ] Reduce payload size (remove unnecessary fields)
- [ ] Add field selection parameter (`?fields=id,title,price`)
- [ ] Implement HTTP/2 push for critical resources

### 4. Image Optimization

**Current:** Cloudinary integration

**Action Items:**
- [ ] Configure automatic format conversion (WebP, AVIF)
- [ ] Set up responsive image transformations
- [ ] Implement lazy loading URLs
- [ ] Configure image quality presets (thumbnail, medium, large, original)
- [ ] Set up automatic image compression
- [ ] Add image CDN optimization

---

## 📈 SEO & DISCOVERABILITY

### 1. Structured Data (Schema.org)

**Status:** Sitemap exists but no JSON-LD structured data

**Action Items:**
- [ ] Add API endpoints to generate structured data:
  - [ ] `GET /api/v1/listings/:id/structured_data` → RealEstateListing schema
  - [ ] `GET /api/v1/blog_posts/:id/structured_data` → Article schema
  - [ ] `GET /api/v1/organization/structured_data` → Organization schema
  - [ ] `GET /api/v1/listing_complexes/:id/structured_data` → Product/Offer schema
- [ ] Include structured data in serializers
- [ ] Validate with Google's Rich Results Test

**Example Schema Types:**
- RealEstateListing
- Organization
- Person (agent profile)
- Article (blog posts)
- Product (listing complexes)
- FAQPage
- BreadcrumbList

### 2. Sitemap Enhancements

**Current:** XML sitemap at `/api/v1/sitemap`

**Improvements:**
- [ ] Add image sitemap for property photos
- [ ] Add video sitemap (if adding video tours)
- [ ] Add news sitemap for blog posts
- [ ] Implement sitemap index for large sites (>50k URLs)
- [ ] Add `changefreq` attribute
- [ ] Optimize priority distribution

### 3. Meta Tags API Endpoints

**Current:** Basic meta configuration in `meta.yml` files

**Action Items:**
- [ ] Add per-page meta tag generation API:
  - [ ] `GET /api/v1/listings/:id/meta_tags`
  - [ ] `GET /api/v1/blog_posts/:id/meta_tags`
  - [ ] `GET /api/v1/pages/:page_name/meta_tags`
- [ ] Include Open Graph tags
- [ ] Include Twitter Card tags
- [ ] Generate unique meta descriptions (AI-powered or template-based)
- [ ] Return canonical URLs

---

## 🔧 API ENHANCEMENTS

### 1. Versioning Strategy

**Current:** `/api/v1/` prefix

**Action Items:**
- [ ] Document API versioning policy
- [ ] Plan for v2 if breaking changes needed
- [ ] Add API version deprecation warnings
- [ ] Set up version sunset timeline communication

### 2. API Documentation

**Current:** Route exists at `/api/v1/docs`

**Action Items:**
- [ ] Verify implementation (may need to build)
- [ ] Add OpenAPI (Swagger) specification
- [ ] Use rswag or similar gem for API docs
- [ ] Document all endpoints with examples
- [ ] Add authentication documentation
- [ ] Include rate limit information
- [ ] Add webhook documentation (if applicable)

### 3. Webhook System

**Status:** Not implemented

**Action Items (Future):**
- [ ] Add webhook configuration per tenant
- [ ] Implement webhook events:
  - [ ] `listing.created`
  - [ ] `listing.updated`
  - [ ] `listing.deleted`
  - [ ] `contact.received`
  - [ ] `newsletter.subscribed`
- [ ] Add webhook retry logic
- [ ] Implement webhook signature verification
- [ ] Create webhook testing tool

### 4. Additional API Endpoints

**Missing Endpoints:**
- [ ] `GET /api/v1/stats/dashboard` - Dashboard statistics
- [ ] `GET /api/v1/analytics/listings` - Listing performance
- [ ] `GET /api/v1/analytics/traffic` - Traffic statistics
- [ ] `POST /api/v1/listings/bulk_import` - CSV import
- [ ] `GET /api/v1/listings/export` - Export listings
- [ ] `POST /api/v1/admin/backup` - Trigger backup
- [ ] `GET /api/v1/admin/system_status` - System health check

---

## 💾 DATA MANAGEMENT

### 1. Backup Strategy

**Action Items:**
- [ ] Configure automated PostgreSQL backups (Railway provides this)
- [ ] Verify backup retention policy (30 days recommended)
- [ ] Test backup restoration process quarterly
- [ ] Document recovery procedures
- [ ] Set up backup monitoring/alerts
- [ ] Consider off-site backup storage

### 2. Data Export

**Action Items:**
- [ ] Add CSV export for all major resources
- [ ] Add JSON export option
- [ ] Implement data portability (GDPR requirement)
- [ ] Create admin tool for bulk data operations

### 3. Data Retention

**Action Items:**
- [ ] Define data retention policies:
  - [ ] Soft-deleted listings: 90 days
  - [ ] Newsletter unsubscribes: retain for compliance
  - [ ] Contact form submissions: 12 months
  - [ ] Audit logs: 12 months
- [ ] Implement automatic cleanup jobs
- [ ] Document data retention in Privacy Policy

---

## 🧪 TESTING & QUALITY

### 1. Test Coverage

**Action Items:**
- [ ] Run SimpleCov to check current coverage
- [ ] Aim for 80%+ test coverage
- [ ] Add missing tests for:
  - [ ] API controllers
  - [ ] Serializers
  - [ ] Mailers
  - [ ] Background jobs
  - [ ] Multi-tenant scoping

### 2. Integration Testing

**Action Items:**
- [ ] Add end-to-end API tests
- [ ] Test multi-tenant isolation
- [ ] Test authentication flows
- [ ] Test email delivery
- [ ] Test webhook delivery (when implemented)

### 3. Load Testing

**Action Items:**
- [ ] Set up load testing (k6, Artillery, or Locust)
- [ ] Test concurrent users (target: 100 concurrent)
- [ ] Test database under load
- [ ] Identify bottlenecks
- [ ] Document performance benchmarks

---

## 📝 DOCUMENTATION

### 1. API Documentation

**Action Items:**
- [ ] Complete `/api/README.md` with all endpoints
- [ ] Add authentication examples
- [ ] Document error responses
- [ ] Add request/response examples
- [ ] Include rate limiting information

### 2. Developer Onboarding

**Action Items:**
- [ ] Create setup guide for new developers
- [ ] Document environment variables
- [ ] Add troubleshooting guide
- [ ] Document deployment process
- [ ] Create development best practices guide

### 3. Operations Runbook

**Action Items:**
- [ ] Document incident response procedures
- [ ] Create recovery procedures
- [ ] Document scaling procedures
- [ ] Add monitoring dashboard guide
- [ ] Create performance optimization checklist

---

## 🔄 FUTURE ENHANCEMENTS

### 1. Multi-Region Support

- [ ] Deploy API to multiple regions
- [ ] Add database read replicas
- [ ] Implement CDN for API responses
- [ ] Configure geo-routing

### 2. GraphQL API

- [ ] Evaluate need for GraphQL
- [ ] Implement GraphQL endpoint alongside REST
- [ ] Create GraphQL schema
- [ ] Add GraphQL playground

### 3. Advanced Features

- [ ] AI-powered listing descriptions
- [ ] Automated property valuation
- [ ] Image recognition for property features
- [ ] Natural language search
- [ ] Recommendation engine

---

## ✅ PRIORITY CHECKLIST

### Week 1 (Critical)
- [ ] Fix email configuration
- [ ] Set up Sentry error tracking
- [ ] Configure rate limiting
- [ ] Verify Cloudinary setup
- [ ] Set up uptime monitoring

### Week 2 (High Priority)
- [ ] Add structured data endpoints
- [ ] Implement caching strategy
- [ ] Add database indexes
- [ ] Set up APM monitoring
- [ ] Complete API documentation

### Week 3-4 (Medium Priority)
- [ ] Implement webhook system
- [ ] Add analytics endpoints
- [ ] Improve test coverage
- [ ] Load testing
- [ ] Backup verification

### Month 2+ (Lower Priority)
- [ ] GraphQL evaluation
- [ ] Multi-region planning
- [ ] Advanced AI features
- [ ] Mobile API optimizations

---

**Next Review:** November 28, 2025
