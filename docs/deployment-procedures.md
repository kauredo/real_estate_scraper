# Deployment & Rollback Procedures

## Overview

This document outlines the deployment procedures, rollback strategies, and production migration plan for the multi-tenancy implementation.

## Pre-Deployment Checklist

### Database Backup

Before any production deployment:

```bash
# Create timestamped backup
railway run pg_dump $DATABASE_URL > backups/production_backup_$(date +%Y%m%d_%H%M%S).sql

# Verify backup
ls -lh backups/

# Store backup securely (upload to S3, Google Drive, etc.)
```

### Environment Variables

Verify all required environment variables are set:

```bash
railway variables

# Required:
# - DATABASE_URL
# - RAILS_ENV=production
# - RAILS_MASTER_KEY
# - CORS_ORIGINS
# - REDIS_URL (if using)
# - CLOUDINARY_URL (for images)
```

### Pre-Deployment Tests

```bash
# Run full test suite
cd api
rails test
rails test:system

# Check for pending migrations
rails db:migrate:status

# Verify seed data
rails db:seed:replant RAILS_ENV=development
```

## Deployment Strategy: Zero-Downtime

### Strategy Overview

We'll use a **Blue-Green deployment** strategy:

1. Deploy new code without running migrations
2. Run migrations (backward compatible)
3. Verify health checks
4. Switch traffic to new version
5. Run data migrations
6. Monitor for issues

### Step 1: Deploy Code

```bash
# On local machine
git checkout main
git pull origin main

# Ensure all changes are committed
git status

# Push to production
git push railway main
```

Railway will automatically:
- Build Docker image
- Deploy new container
- Keep old container running

### Step 2: Run Schema Migrations

```bash
# Run migrations (should be backward compatible)
railway run rails db:migrate

# Verify migrations
railway run rails db:migrate:status
```

### Step 3: Health Check

```bash
# Check API health
curl https://api-production-329b.up.railway.app/api/v1/docs

# Check with SGG API key
curl -H "X-API-Key: $SGG_API_KEY" \
  https://api-production-329b.up.railway.app/api/v1/listings | jq '.listings | length'
```

### Step 4: Run Data Migrations

```bash
# Install data_migrate gem if not already
# Then run data migrations
railway run rails data:migrate

# Verify
railway run rails runner "puts Tenant.count"
railway run rails runner "puts Listing.where(tenant_id: nil).count" # Should be 0
```

### Step 5: Monitor

Monitor for 30 minutes:

```bash
# Check logs
railway logs

# Check error tracking (Sentry)
# Visit Sentry dashboard

# Monitor key metrics
railway run rails runner "puts Listing.count"
railway run rails runner "puts BlogPost.count"
```

## Production Migration Steps

### Phase 1: Initial Setup (No Downtime)

**1. Deploy tenant table and middleware (tenant_id nullable)**

```bash
# This can be deployed without affecting existing functionality
git checkout -b prod-migration-phase1
git push railway prod-migration-phase1

# Migrations in this phase:
# - Create tenants table
# - Add tenant_id to all tables (nullable)
# - Add middleware (doesn't break if no API key)
```

**2. Create SGG tenant**

```bash
railway run rails runner "
  sgg = Tenant.create!(
    name: 'Sofia Galvao Group',
    slug: 'sgg',
    domain: 'sofiagalvaogroup.com',
    contact_email: 'info@sofiagalvaogroup.com',
    active: true,
    features: {
      blog_enabled: true,
      club_enabled: true,
      testimonials_enabled: true,
      newsletter_enabled: true,
      listing_complexes_enabled: true
    }
  )
  puts \"SGG Tenant ID: #{sgg.id}\"
  puts \"SGG API Key: #{sgg.api_key}\"
"

# SAVE THE API KEY SECURELY!
```

**3. Run data migration**

```bash
railway run rails data:migrate

# Verify all records have tenant_id
railway run rails runner "
  models = [Listing, BlogPost, BlogPhoto, ListingComplex, Photo, Testimonial, Variable, ClubStory, ClubStoryPhoto, ClubUser, NewsletterSubscription, Admin]
  models.each do |model|
    count = model.unscoped.where(tenant_id: nil).count
    puts \"#{model.name}: #{count} records without tenant_id\"
  end
"
```

### Phase 2: Enforce Tenant Scoping (Brief Downtime Window)

**Recommended: Deploy during low-traffic hours (2-4 AM)**

**1. Update frontend with API key**

```bash
# Update environment variables
VITE_API_KEY=<SGG_API_KEY>

# Deploy frontend
cd frontend
npm run build
vercel --prod
```

**2. Deploy backend with tenant enforcement**

```bash
git checkout -b prod-migration-phase2

# This phase includes:
# - Make tenant_id NOT NULL
# - Enable default_scope in models
# - Enable verify_tenant in BaseController

git push railway prod-migration-phase2
```

**3. Run NOT NULL migrations**

```bash
railway run rails db:migrate

# This makes tenant_id NOT NULL on all tables
```

**4. Verify immediately**

```bash
# Test API with SGG key
curl -H "X-API-Key: $SGG_API_KEY" \
  https://api-production-329b.up.railway.app/api/v1/listings

# Test admin login
curl -X POST https://api-production-329b.up.railway.app/api/v1/auth/login \
  -H "X-API-Key: $SGG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sofiagalvaogroup.com","password":"password"}'

# Check logs for errors
railway logs --tail
```

**Expected Downtime: 2-5 minutes**

### Phase 3: Feature Flags & Cleanup

**1. Test feature flags**

```bash
# Disable a feature temporarily
railway run rails runner "
  sgg = Tenant.find_by(slug: 'sgg')
  sgg.update(club_enabled: false)
"

# Test that club endpoints return 404
curl -H "X-API-Key: $SGG_API_KEY" \
  https://api-production-329b.up.railway.app/api/v1/club_stories
# Should return 404

# Re-enable
railway run rails runner "
  sgg = Tenant.find_by(slug: 'sgg')
  sgg.update(club_enabled: true)
"
```

**2. Clean up old code**

```bash
# Remove any temporary code, comments, debug logging
git checkout -b cleanup-multi-tenancy
# Make changes
git push railway cleanup-multi-tenancy
```

## Rollback Procedures

### Emergency Rollback (< 30 mins after deployment)

If critical issues are detected immediately after deployment:

**Option 1: Railway Rollback**

```bash
# Railway keeps previous deployment
# Use Railway dashboard to rollback to previous deployment
# Or via CLI:
railway rollback
```

**Option 2: Git Revert**

```bash
# Revert the merge commit
git revert HEAD
git push railway main

# This will trigger new deployment with old code
```

**Option 3: Database Rollback**

```bash
# Only if database changes are causing issues
railway run rails db:rollback STEP=5

# Then rollback code
railway rollback
```

### Partial Rollback (Disable Features)

If only multi-tenancy is causing issues, but you can't fully rollback:

**Temporarily disable tenant verification:**

```ruby
# app/controllers/api/base_controller.rb
def verify_tenant
  # Temporarily disabled for rollback
  # unless Current.tenant
  #   render json: { error: 'Invalid or missing API key' }, status: :unauthorized
  #   return false
  # end
  true
end
```

Deploy this hotfix:

```bash
git checkout -b hotfix-disable-tenant-check
# Make change above
git commit -am "Hotfix: temporarily disable tenant verification"
git push railway hotfix-disable-tenant-check
```

### Full Rollback (> 30 mins after deployment)

If issues are detected hours/days after deployment:

**1. Restore database backup**

```bash
# Download backup
scp backups/production_backup_TIMESTAMP.sql server:/tmp/

# Restore (THIS WILL OVERWRITE CURRENT DATA)
railway run psql $DATABASE_URL < /tmp/production_backup_TIMESTAMP.sql
```

**2. Rollback code**

```bash
# Find commit before multi-tenancy
git log --oneline

# Reset to that commit
git reset --hard <commit-hash>
git push --force railway main
```

**3. Clear cache**

```bash
railway run rails cache:clear
```

**4. Verify**

```bash
# Test API
curl https://api-production-329b.up.railway.app/api/v1/listings

# Check database
railway run rails runner "puts Listing.count"
```

## Common Issues & Solutions

### Issue: Frontend not sending API key

**Symptoms:** All requests return 401 Unauthorized

**Solution:**

```bash
# Check frontend env vars
vercel env ls

# Update env var
vercel env add VITE_API_KEY production

# Redeploy frontend
vercel --prod
```

### Issue: Some records missing tenant_id

**Symptoms:** Data not showing up after migration

**Solution:**

```bash
# Find records without tenant_id
railway run rails runner "
  Listing.unscoped.where(tenant_id: nil).each do |listing|
    puts \"Listing ID: #{listing.id}\"
  end
"

# Manually assign to SGG
railway run rails runner "
  sgg = Tenant.find_by(slug: 'sgg')
  Listing.unscoped.where(tenant_id: nil).update_all(tenant_id: sgg.id)
"
```

### Issue: Admin can't log in

**Symptoms:** Admin login returns 401 or 403

**Solution:**

```bash
# Check admin has tenant_id
railway run rails runner "
  admin = Admin.find_by(email: 'admin@sofiagalvaogroup.com')
  puts \"Admin tenant_id: #{admin.tenant_id}\"
"

# Assign if missing
railway run rails runner "
  admin = Admin.find_by(email: 'admin@sofiagalvaogroup.com')
  sgg = Tenant.find_by(slug: 'sgg')
  admin.update_column(:tenant_id, sgg.id)
"
```

### Issue: Performance degradation

**Symptoms:** Slow queries after migration

**Solution:**

```bash
# Check if indexes exist
railway run rails runner "
  ActiveRecord::Base.connection.indexes(:listings).each do |index|
    puts index.inspect
  end
"

# Add missing indexes
railway run rails generate migration AddMissingTenantIndexes

# In migration:
add_index :listings, :tenant_id
add_index :listings, [:tenant_id, :status]
add_index :blog_posts, :tenant_id
# etc.

railway run rails db:migrate
```

## Monitoring Post-Deployment

### Key Metrics to Monitor

**1. Error Rate**

```bash
# Check Sentry for error rate
# Should remain stable after deployment
```

**2. Response Time**

```bash
# Monitor Railway metrics
# API response time should be < 200ms for most endpoints
```

**3. Database Queries**

```bash
# Check slow queries
railway run rails runner "
  ActiveRecord::Base.logger = Logger.new(STDOUT)
  Listing.first
"
```

**4. Request Count**

```bash
# Monitor requests per minute
# Should match historical patterns
```

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

API_URL="https://api-production-329b.up.railway.app/api/v1"
API_KEY=$SGG_API_KEY

echo "=== Health Check ==="

# Test basic endpoint
echo "Testing /listings..."
response=$(curl -s -H "X-API-Key: $API_KEY" "$API_URL/listings")
count=$(echo $response | jq '.listings | length')
echo "Listings returned: $count"

# Test admin login
echo "Testing admin login..."
login_response=$(curl -s -X POST "$API_URL/auth/login" \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sofiagalvaogroup.com","password":"ADMIN_PASSWORD"}')
token=$(echo $login_response | jq -r '.token')

if [ "$token" != "null" ]; then
  echo "Admin login: ✓"
else
  echo "Admin login: ✗"
fi

# Test feature flags
echo "Testing blog (should work)..."
blog_response=$(curl -s -H "X-API-Key: $API_KEY" "$API_URL/blog_posts")
blog_count=$(echo $blog_response | jq '.blog_posts | length')
echo "Blog posts returned: $blog_count"

echo "=== Health Check Complete ==="
```

## Post-Deployment Tasks

### Week 1: Close Monitoring

- [ ] Check error rates daily
- [ ] Monitor response times
- [ ] Review logs for anomalies
- [ ] Test all major features
- [ ] Verify data integrity

### Week 2: Optimization

- [ ] Analyze slow queries
- [ ] Add missing indexes
- [ ] Optimize N+1 queries
- [ ] Review cache hit rates

### Month 1: Documentation

- [ ] Document any issues encountered
- [ ] Update runbooks
- [ ] Create tenant onboarding guide
- [ ] Write API documentation for clients

## Adding New Tenants (Post-Migration)

### Process

**1. Create tenant**

```bash
railway run rails runner "
  tenant = Tenant.create!(
    name: 'New Agency',
    slug: 'new-agency',
    domain: 'newagency.com',
    contact_email: 'info@newagency.com',
    active: true,
    blog_enabled: true,
    club_enabled: false,
    testimonials_enabled: true,
    newsletter_enabled: true,
    listing_complexes_enabled: false
  )
  puts \"Tenant: #{tenant.name}\"
  puts \"API Key: #{tenant.api_key}\"
"
```

**2. Update CORS**

```bash
# Add new domain to CORS_ORIGINS
railway variables set CORS_ORIGINS="https://sofiagalvaogroup.com,https://newagency.com"
```

**3. Create admin for new tenant**

```bash
railway run rails runner "
  tenant = Tenant.find_by(slug: 'new-agency')
  admin = Admin.create!(
    email: 'admin@newagency.com',
    password: SecureRandom.hex(16),
    tenant_id: tenant.id,
    confirmed: true
  )
  puts \"Admin created: #{admin.email}\"
  puts \"Temporary password: #{admin.password}\"
"
```

**4. Provide to client**

```
API Base URL: https://api-production-329b.up.railway.app/api/v1
API Key: <their_api_key>
Admin Email: admin@newagency.com
Temporary Password: <temporary_password>

Features Enabled:
- Blog: Yes
- Testimonials: Yes
- Others: No
```

**5. Client deploys frontend**

```bash
# Client's .env.production
VITE_API_URL=https://api-production-329b.up.railway.app/api/v1
VITE_API_KEY=<their_api_key>
```

## Security Checklist

Post-deployment security verification:

- [ ] API keys are stored in environment variables, not code
- [ ] CORS origins are properly configured
- [ ] Rate limiting is enabled
- [ ] SQL injection prevention verified
- [ ] Admin authentication requires both API key and JWT
- [ ] Cross-tenant data access is blocked
- [ ] Error messages don't leak sensitive info
- [ ] Logs don't contain API keys or passwords
- [ ] Database backups are encrypted
- [ ] Environment variables are not exposed in logs

## Summary

This deployment process ensures:
- ✅ Zero-downtime deployment (except brief window for Phase 2)
- ✅ Database backups before all changes
- ✅ Gradual rollout with verification steps
- ✅ Clear rollback procedures
- ✅ Monitoring and health checks
- ✅ Post-deployment optimization

Always err on the side of caution - if in doubt, rollback and investigate.
