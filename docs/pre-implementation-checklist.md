# Pre-Implementation Checklist

Before starting the multi-tenancy implementation, let's verify we've covered all critical aspects.

## ✅ Architecture & Design (Complete)

- [x] Row-level multi-tenancy strategy chosen
- [x] Tenant model design with API keys
- [x] Feature flags system design
- [x] Data isolation strategy (default scopes)
- [x] Super admin role and permissions
- [x] Unified backoffice architecture (separate React app)
- [x] Backoffice access strategy (redirect from client sites)
- [x] Security considerations documented
- [x] Deployment strategy defined

## ⚠️ Open Questions to Resolve

### 1. User Model - Shared or Tenant-Scoped?

**Current state:**
```ruby
# db/schema.rb
create_table "users" do |t|
  t.string "first_name"
  t.string "last_name"
  t.string "email"
  t.string "phone"
  t.boolean "confirmed_email"
end

# No tenant_id currently
```

**Question:** Are `users` shared across tenants or tenant-specific?

**Use case:** Newsletter subscriptions reference users:
```ruby
create_table "newsletter_subscriptions" do |t|
  t.bigint "user_id"
  t.bigint "tenant_id"  # Will be added
end
```

**Options:**

**A) Tenant-scoped users (Recommended)**
- Users belong to a specific tenant
- Same email can exist across different tenants
- newsletter@example.com for SGG is different from newsletter@example.com for New Agency

**B) Global users**
- Users shared across all tenants
- One user can subscribe to multiple tenants' newsletters
- More complex relationships

**Recommendation: A (Tenant-scoped)**

**Decision needed:** ✅ Add `tenant_id` to users table

---

### 2. Admin Creation - How Do New Tenants Get Admins?

**Scenarios:**

**A) Super Admin Creates Tenant Admin**
```ruby
# Super admin uses backoffice UI to create tenant and admin
tenant = Tenant.create!(name: 'New Agency', ...)
admin = Admin.create!(
  email: 'admin@newagency.com',
  password: temp_password,
  tenant_id: tenant.id,
  role: :tenant_admin
)
# Email temporary password to client
```

**B) Self-Service Signup (Future)**
- Public signup form
- Creates tenant + admin
- Requires approval from super admin
- More complex, can add later

**Recommendation: A (Super admin creates)**

**Decision needed:** ✅ Super admin manually creates tenant + first admin

---

### 3. File Uploads - Cloudinary Organization

**Current setup:**
- Using Cloudinary for image storage
- Photos for listings, blog posts, etc.

**Question:** Should Cloudinary folders be organized by tenant?

**Recommendation:**
```ruby
# app/uploaders/photo_uploader.rb
class PhotoUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  def public_id
    # Organize by tenant
    "#{Current.tenant&.slug}/#{model.class.name.underscore}/#{mounted_as}/#{model.id}"
  end
end

# Results in:
# sgg/listing/image/123.jpg
# new-agency/listing/image/456.jpg
```

**Benefits:**
- Easy to identify tenant's files
- Easy to migrate tenant to different storage
- Can set different quotas per tenant

**Decision needed:** ✅ Update uploaders to include tenant slug in path

---

### 4. Background Jobs - Tenant Context

**Current setup:**
- Using `good_job` for background processing
- Jobs might need tenant context

**Issue:** Jobs run in background - how do they know which tenant?

**Solution:**
```ruby
# app/jobs/application_job.rb
class ApplicationJob < ActiveJob::Base
  before_perform do |job|
    # Restore tenant context from job arguments
    if job.arguments.first.is_a?(Hash) && job.arguments.first[:tenant_id]
      Current.tenant = Tenant.find(job.arguments.first[:tenant_id])
    end
  end

  after_perform do
    # Clear tenant context
    Current.reset
  end
end

# Usage in jobs:
class SendNewsletterJob < ApplicationJob
  def perform(tenant_id:, newsletter_id:)
    # Current.tenant is automatically set
    newsletter = Newsletter.find(newsletter_id)
    # ... send newsletter ...
  end
end

# Enqueue with tenant_id:
SendNewsletterJob.perform_later(tenant_id: Current.tenant.id, newsletter_id: 123)
```

**Decision needed:** ✅ Update ApplicationJob to handle tenant context

---

### 5. Email Sending - Tenant-Specific Addresses

**Use cases:**
- Contact form submissions → notify tenant
- Newsletter confirmations → from tenant's email
- Admin notifications → to tenant admin

**Question:** Should emails come from tenant-specific addresses?

**Options:**

**A) Single sender address**
```
From: noreply@yourdomain.com
Reply-To: info@sofiagalvaogroup.com (tenant's email)
```

**B) Tenant-specific sender**
```
From: noreply@sofiagalvaogroup.com (requires DNS setup per tenant)
```

**C) Dynamic sender based on tenant**
```ruby
# app/mailers/application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: -> { Current.tenant&.contact_email || 'noreply@yourdomain.com' }
end
```

**Recommendation: A (Single sender + Reply-To)**
- Simplest to set up
- No DNS configuration per tenant
- Reply-To ensures responses go to tenant

**Decision needed:** ✅ Use single sender with tenant's Reply-To

---

### 6. API Documentation - For Clients

**Question:** How do clients know what API endpoints are available?

**Current state:**
- `/api/v1/docs` endpoint exists
- Returns basic API documentation

**Options:**

**A) Static documentation**
- Markdown file in docs/
- Update manually when API changes

**B) Swagger/OpenAPI**
- Auto-generated from routes
- Interactive API explorer
- Can show which features are available per tenant

**C) Custom docs endpoint**
- Returns available endpoints based on tenant's feature flags
```ruby
# GET /api/v1/docs
{
  "endpoints": {
    "listings": { "available": true, "methods": ["GET", "POST"] },
    "blog_posts": { "available": true, "methods": ["GET"] },
    "club_stories": { "available": false, "reason": "feature_disabled" }
  }
}
```

**Recommendation: Start with A, add C later**

**Decision needed:** ✅ Create API documentation markdown for clients

---

### 7. Rate Limiting - Per Tenant or Global?

**Question:** Should rate limits be per-tenant or global?

**Consideration:**
- Prevent one tenant from overwhelming API
- Different tiers could have different limits (future)

**Recommendation:**
```ruby
# config/initializers/rack_attack.rb
Rack::Attack.throttle('api_per_tenant', limit: 300, period: 60.seconds) do |req|
  if req.path.start_with?('/api/') && req.env['HTTP_X_API_KEY']
    # Rate limit per tenant (identified by API key)
    "tenant:#{req.env['HTTP_X_API_KEY']}"
  end
end
```

**Decision needed:** ✅ Implement per-tenant rate limiting

---

### 8. Data Export - GDPR Compliance

**Question:** Can tenants export all their data?

**Future consideration:**
- GDPR right to data portability
- Useful for tenant migration
- Not critical for MVP

**Recommendation: Add to backlog, not for initial implementation**

**Decision needed:** ⏸️ Defer to future phase

---

### 9. Audit Logging - Track Super Admin Actions

**Question:** Should we track who changed what?

**Critical actions to log:**
- Tenant created/deleted
- Feature flags changed
- API key rotated
- Admin added/removed

**Recommendation:**
```ruby
# app/models/audit_log.rb
class AuditLog < ApplicationRecord
  belongs_to :admin
  belongs_to :tenant, optional: true

  # Log structure:
  # {
  #   action: 'tenant.created',
  #   admin_id: 1,
  #   tenant_id: 2,
  #   changes: { name: [nil, 'New Agency'] },
  #   ip_address: '1.2.3.4',
  #   timestamp: '2025-01-06T12:00:00Z'
  # }
end
```

**Decision needed:** ⏸️ Nice to have, add to backlog

---

### 10. Frontend API Client - Ensure All Calls Include API Key

**Critical:** Every API call from client frontends must include `X-API-Key`

**Current state:** Let's verify this is consistent

**Action needed:**
```typescript
// Create centralized API client
// frontend/src/utils/api-client.ts

const API_KEY = import.meta.env.VITE_API_KEY;

class ApiClient {
  private headers() {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,  // ← Critical!
    };
  }

  async get(endpoint: string) {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      headers: this.headers(),
    });
  }

  // ... other methods
}

export const api = new ApiClient();
```

**Then update all fetch calls:**
```typescript
// Before (scattered throughout app)
fetch('/api/v1/listings')

// After (centralized)
api.get('/listings')
```

**Decision needed:** ✅ Create centralized API client with API key

---

## 🎯 Decisions Summary

### Must Implement Now:
1. ✅ Add `tenant_id` to `users` table (tenant-scoped)
2. ✅ Update Cloudinary uploaders to include tenant slug
3. ✅ Update `ApplicationJob` to handle tenant context
4. ✅ Configure email sending (single sender + Reply-To)
5. ✅ Create centralized API client for frontend
6. ✅ Implement per-tenant rate limiting
7. ✅ Create client API documentation

### Can Defer:
8. ⏸️ Self-service tenant signup (super admin creates tenants manually for now)
9. ⏸️ Data export functionality (add when needed)
10. ⏸️ Audit logging (nice to have, not critical for MVP)

---

## 📋 Updated Implementation Plan

### Phase 1: Database & Models (Week 1)
1. Create Tenant model
2. Add `tenant_id` to all models (including `users`)
3. Create `ActsAsTenant` concern
4. Update all models
5. Update Cloudinary uploaders

### Phase 2: Authentication & Middleware (Week 1)
6. Create `TenantMiddleware`
7. Update `BaseController`
8. Create `FeatureFlag` concern
9. Update controllers with feature flags
10. Create centralized API client in frontend

### Phase 3: Jobs & Background Processing (Week 1-2)
11. Update `ApplicationJob` with tenant context
12. Test background jobs with tenants

### Phase 4: Email & Rate Limiting (Week 2)
13. Configure email with tenant Reply-To
14. Implement Rack::Attack rate limiting

### Phase 5: Super Admin (Week 2-3)
15. Add `role` to admins
16. Create super admin endpoints
17. Create first super admin

### Phase 6: Data Migration (Week 3)
18. Create SGG tenant
19. Migrate existing data
20. Test thoroughly

### Phase 7: Deployment (Week 3-4)
21. Deploy to staging
22. Test with multiple tenants
23. Deploy to production
24. Monitor closely

### Phase 8: Admin Backoffice (Week 5-12)
25. Build React admin panel
26. Super admin features
27. Tenant admin features
28. Deploy admin backoffice

---

## 🔍 Pre-Flight Checks

Before we start coding, verify:

### Environment
- [ ] PostgreSQL is running
- [ ] Redis is running (for Good Job)
- [ ] Cloudinary credentials are set
- [ ] All gems installed (`bundle install`)

### Testing
- [ ] Test suite passes (`rails test`)
- [ ] Database can be reset (`rails db:reset`)

### Git
- [ ] Working on `api-new` branch (or create `multi-tenancy` branch)
- [ ] No uncommitted changes
- [ ] Backup created

### Documentation
- [ ] Team reviewed architecture docs
- [ ] Understood the scope of changes
- [ ] Timeline agreed upon

---

## 🚀 Ready to Start?

Once you confirm:
1. ✅ Users should be tenant-scoped
2. ✅ Super admin manually creates tenants/admins
3. ✅ File uploads should include tenant slug
4. ✅ Emails use single sender with Reply-To
5. ✅ Rate limiting per tenant
6. ✅ Defer audit logging for now

**We can start implementation!**

### Starting Point
Begin with Phase 1, Step 1:
```bash
cd api
rails generate model Tenant name:string slug:string api_key:string \
  features:jsonb metadata:jsonb domain:string contact_email:string active:boolean
```

Let me know if any of these decisions need discussion, or we can proceed with implementation! 🎯
