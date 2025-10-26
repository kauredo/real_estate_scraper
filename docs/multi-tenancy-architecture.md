# Multi-Tenancy Architecture

## Overview

This document describes the multi-tenancy architecture for the Real Estate Scraper API, enabling a single backend to serve multiple real estate agency frontends with isolated data and configurable features.

## Architecture Type: Row-Level Multi-Tenancy

We've chosen **row-level multi-tenancy** over schema-based or database-based approaches for the following reasons:

### Why Row-Level?

1. **Cost-Effective**: Single database, shared infrastructure
2. **Easier Maintenance**: One database to backup, migrate, and maintain
3. **Shared Resources**: Connection pooling, caching work efficiently
4. **Flexible Feature Flags**: Different features per tenant without code changes
5. **Gradual Rollout**: Add tenants incrementally without infrastructure changes

### Trade-offs

**Pros:**
- Lower operational costs
- Simplified deployment
- Easier to add new tenants
- Centralized data management

**Cons:**
- Requires careful query scoping (mitigated with concerns)
- Single point of failure (mitigated with proper backup strategy)
- Must ensure data isolation in code (mitigated with default scopes)

## Core Components

### 1. Tenant Model

The `Tenant` model is the cornerstone of multi-tenancy:

```ruby
class Tenant < ApplicationRecord
  has_secure_token :api_key

  # Associations
  has_many :listings
  has_many :blog_posts
  has_many :admins
  has_many :testimonials
  has_many :variables
  has_many :listing_complexes
  has_many :club_stories

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true
  validates :api_key, presence: true, uniqueness: true

  # Feature flags stored in JSONB
  store_accessor :features,
                 :blog_enabled,
                 :club_enabled,
                 :testimonials_enabled,
                 :newsletter_enabled,
                 :listing_complexes_enabled
end
```

**Schema:**
```ruby
create_table :tenants do |t|
  t.string :name, null: false
  t.string :slug, null: false
  t.string :api_key, null: false
  t.jsonb :features, default: {}
  t.jsonb :metadata, default: {}
  t.string :domain
  t.string :contact_email
  t.boolean :active, default: true

  t.timestamps

  t.index :api_key, unique: true
  t.index :slug, unique: true
end
```

**Feature Flags Schema:**
```json
{
  "blog_enabled": true,
  "club_enabled": false,
  "testimonials_enabled": true,
  "newsletter_enabled": true,
  "listing_complexes_enabled": true
}
```

**Metadata Schema (Optional):**
```json
{
  "company_name": "Sofia Galvao Group",
  "primary_color": "#d4af37",
  "contact_phone": "+351...",
  "timezone": "Europe/Lisbon"
}
```

### 2. Tenant-Scoped Models

All models that store tenant-specific data need a `tenant_id` foreign key:

**Tenant-Scoped Models:**
- `Listing` - Property listings
- `BlogPost` - Blog content (if feature enabled)
- `BlogPhoto` - Blog images
- `ListingComplex` - Enterprise/development properties
- `Photo` - Listing complex photos
- `Testimonial` - Client testimonials
- `Variable` - Dynamic content variables
- `ClubStory` - Club stories (if feature enabled)
- `ClubStoryPhoto` - Club story images
- `ClubUser` - Club members (if feature enabled)
- `NewsletterSubscription` - Newsletter signups
- `Admin` - Admin users (belong to tenant)

**Shared Models (No tenant_id):**
- `User` - Could be shared or scoped, depending on requirements
- Translation tables (automatically scoped through parent)

### 3. ActsAsTenant Concern

A reusable concern to automatically scope all queries to the current tenant:

```ruby
# app/models/concerns/acts_as_tenant.rb
module ActsAsTenant
  extend ActiveSupport::Concern

  included do
    belongs_to :tenant
    validates :tenant_id, presence: true

    default_scope { where(tenant_id: Current.tenant&.id) if Current.tenant }

    before_validation :set_tenant, on: :create
  end

  class_methods do
    def acts_as_tenant(tenant_class = :tenant)
      # Already included via concern
    end
  end

  private

  def set_tenant
    self.tenant_id ||= Current.tenant&.id
  end
end
```

### 4. Current Context

Thread-safe storage of current tenant:

```ruby
# app/models/current.rb
class Current < ActiveSupport::CurrentAttributes
  attribute :tenant
  attribute :admin
end
```

### 5. Tenant Identification Middleware

Identifies tenant from API key in request header:

```ruby
# app/middleware/tenant_middleware.rb
class TenantMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    request = ActionDispatch::Request.new(env)
    api_key = extract_api_key(request)

    if api_key.present?
      tenant = Tenant.find_by(api_key: api_key, active: true)
      Current.tenant = tenant if tenant
    end

    @app.call(env)
  ensure
    # Clear context after request
    Current.reset
  end

  private

  def extract_api_key(request)
    # Try header first: X-API-Key
    api_key = request.headers['X-API-Key']

    # Fallback to Authorization Bearer token (if not JWT)
    api_key ||= request.headers['Authorization']&.gsub('Bearer ', '') if simple_token?

    api_key
  end

  def simple_token?(token)
    # Differentiate between JWT and simple API key
    # JWTs have 3 parts separated by dots
    token.present? && token.split('.').length != 3
  end
end
```

### 6. Feature Flag Concern

Provides methods to check if features are enabled:

```ruby
# app/controllers/concerns/feature_flag.rb
module FeatureFlag
  extend ActiveSupport::Concern

  included do
    before_action :verify_tenant
  end

  private

  def verify_tenant
    unless Current.tenant
      render json: { error: 'Invalid or missing API key' }, status: :unauthorized
      return false
    end
  end

  def feature_enabled?(feature_name)
    return false unless Current.tenant

    Current.tenant.public_send("#{feature_name}_enabled") == true
  rescue NoMethodError
    false
  end

  def require_feature!(feature_name)
    unless feature_enabled?(feature_name)
      render json: { error: 'Not Found' }, status: :not_found
      return false
    end
  end
end
```

## Request Flow

### 1. Frontend Makes Request

```javascript
// frontend/src/utils/api.js
const API_KEY = import.meta.env.VITE_API_KEY;

fetch('https://api.example.com/api/v1/listings', {
  headers: {
    'X-API-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});
```

### 2. Middleware Identifies Tenant

1. `TenantMiddleware` extracts API key from `X-API-Key` header
2. Looks up `Tenant` by API key
3. Sets `Current.tenant` for the request
4. If no tenant found or inactive, `Current.tenant` remains nil

### 3. Controller Verifies Tenant

```ruby
class Api::V1::ListingsController < Api::V1::BaseController
  include FeatureFlag

  def index
    # Current.tenant is set by middleware
    # Default scope in Listing model filters by tenant_id automatically
    @listings = Listing.all

    render json: @listings
  end
end
```

### 4. Model Queries Scoped

```ruby
# With Current.tenant set:
Listing.all
# => SELECT * FROM listings WHERE tenant_id = 1

# Without Current.tenant (returns empty):
Listing.all
# => SELECT * FROM listings WHERE tenant_id = NULL
```

### 5. Feature Flag Checks

```ruby
class Api::V1::BlogPostsController < Api::V1::BaseController
  include FeatureFlag

  before_action -> { require_feature!(:blog) }

  def index
    @blog_posts = BlogPost.visible
    render json: @blog_posts
  end
end
```

## Feature Flag Management

### Available Features

| Feature | Description | Initially Enabled For |
|---------|-------------|----------------------|
| `blog_enabled` | Blog posts and blog photos | SGG |
| `club_enabled` | Club stories, club users, club join | SGG |
| `testimonials_enabled` | Client testimonials | SGG |
| `newsletter_enabled` | Newsletter subscriptions | SGG |
| `listing_complexes_enabled` | Enterprise/development listings | SGG |

### Enabling/Disabling Features

Via Rails console:
```ruby
tenant = Tenant.find_by(slug: 'sgg')
tenant.update(blog_enabled: true)
tenant.update(club_enabled: false)
```

Via API (future admin endpoint):
```bash
PATCH /api/v1/admin/tenant/features
{
  "blog_enabled": true,
  "club_enabled": false
}
```

### Adding New Features

1. Add to `Tenant` model `store_accessor`:
```ruby
store_accessor :features, :new_feature_enabled
```

2. Add default in migration:
```ruby
add_column :tenants, :features, :jsonb, default: { new_feature_enabled: false }
```

3. Add feature check in controller:
```ruby
before_action -> { require_feature!(:new_feature) }
```

## Data Isolation Strategy

### Default Scopes

Every tenant-scoped model includes:
```ruby
default_scope { where(tenant_id: Current.tenant&.id) if Current.tenant }
```

**Pros:**
- Automatic filtering on all queries
- Prevents accidental data leakage
- Clean controller code

**Cons:**
- Can be surprising if not understood
- Requires `unscoped` for cross-tenant queries (admin only)

### Validation

All tenant-scoped models validate presence:
```ruby
validates :tenant_id, presence: true
```

### Testing Isolation

Always test with multiple tenants:
```ruby
let(:tenant_a) { create(:tenant) }
let(:tenant_b) { create(:tenant) }

it 'isolates tenant data' do
  Current.tenant = tenant_a
  listing_a = create(:listing)

  Current.tenant = tenant_b
  expect(Listing.all).not_to include(listing_a)
end
```

## Admin Access Control

### Admin Belongs to Tenant

```ruby
class Admin < ApplicationRecord
  belongs_to :tenant
  validates :tenant_id, presence: true
end
```

### Admin Can Only Access Their Tenant

```ruby
class Api::V1::Admin::BaseController < Api::V1::BaseController
  include FeatureFlag
  before_action :authenticate_admin!

  private

  def authenticate_admin!
    # ... JWT decode logic ...
    @current_admin = Admin.find(decoded[:admin_id])

    # Verify admin belongs to current tenant
    unless @current_admin.tenant_id == Current.tenant&.id
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return false
    end
  end
end
```

## Migration from Single to Multi-Tenant

### Phase 1: Add Tenant Table

```bash
rails generate model Tenant name:string slug:string api_key:string \
  features:jsonb metadata:jsonb domain:string contact_email:string active:boolean
```

### Phase 2: Add tenant_id to All Models

```bash
rails generate migration AddTenantIdToListings tenant:references
rails generate migration AddTenantIdToBlogPosts tenant:references
# ... repeat for all tenant-scoped models
```

### Phase 3: Create SGG Tenant

```ruby
# db/seeds.rb or data migration
sgg = Tenant.create!(
  name: 'Sofia Galvao Group',
  slug: 'sgg',
  api_key: SecureRandom.hex(32),
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
```

### Phase 4: Migrate Existing Data

```ruby
# db/data/20250106_assign_data_to_sgg_tenant.rb
class AssignDataToSggTenant < ActiveRecord::Migration[7.1]
  def up
    sgg = Tenant.find_by(slug: 'sgg')
    raise 'SGG tenant not found' unless sgg

    # Use update_all to bypass validations and scopes
    Listing.unscoped.update_all(tenant_id: sgg.id)
    BlogPost.unscoped.update_all(tenant_id: sgg.id)
    ListingComplex.unscoped.update_all(tenant_id: sgg.id)
    Testimonial.unscoped.update_all(tenant_id: sgg.id)
    Variable.unscoped.update_all(tenant_id: sgg.id)
    ClubStory.unscoped.update_all(tenant_id: sgg.id)
    ClubUser.unscoped.update_all(tenant_id: sgg.id)
    NewsletterSubscription.unscoped.update_all(tenant_id: sgg.id)
    Admin.unscoped.update_all(tenant_id: sgg.id)

    # Photos and photo associations
    Photo.unscoped.update_all(tenant_id: sgg.id)
    BlogPhoto.unscoped.update_all(tenant_id: sgg.id)
    ClubStoryPhoto.unscoped.update_all(tenant_id: sgg.id)
  end

  def down
    # Can't easily reverse, but for testing:
    [Listing, BlogPost, ListingComplex, Testimonial, Variable,
     ClubStory, ClubUser, NewsletterSubscription, Admin,
     Photo, BlogPhoto, ClubStoryPhoto].each do |model|
      model.unscoped.update_all(tenant_id: nil)
    end
  end
end
```

### Phase 5: Make tenant_id NOT NULL

After data migration, add NOT NULL constraint:
```ruby
class MakeTenantIdNotNull < ActiveRecord::Migration[7.1]
  def change
    change_column_null :listings, :tenant_id, false
    change_column_null :blog_posts, :tenant_id, false
    # ... repeat for all models
  end
end
```

## Adding a New Tenant

### 1. Create Tenant Record

```ruby
new_tenant = Tenant.create!(
  name: 'New Agency',
  slug: 'new-agency',
  domain: 'newagency.com',
  contact_email: 'info@newagency.com',
  active: true,
  features: {
    blog_enabled: true,
    club_enabled: false,  # Disabled for this tenant
    testimonials_enabled: true,
    newsletter_enabled: true,
    listing_complexes_enabled: false  # Not using this feature
  }
)

# Save API key to share with client
puts "API Key: #{new_tenant.api_key}"
```

### 2. Update CORS

```ruby
# config/initializers/cors.rb
# Add new tenant's domain to CORS_ORIGINS env variable
# CORS_ORIGINS=https://sofiagalvaogroup.com,https://newagency.com
```

Or update Railway environment variable:
```bash
railway variables set CORS_ORIGINS="https://sofiagalvaogroup.com,https://newagency.com,https://vercel.app/*"
```

### 3. Provide API Key to Client

Share with client securely:
- API key
- API base URL
- Feature flags enabled for their tenant
- API documentation

### 4. Client Frontend Setup

```bash
# .env.production
VITE_API_URL=https://api-production-329b.up.railway.app/api/v1
VITE_API_KEY=<their_unique_api_key>
```

```javascript
// frontend/src/utils/api.js
const headers = {
  'X-API-Key': import.meta.env.VITE_API_KEY,
  'Content-Type': 'application/json'
};
```

## Security Considerations

### 1. API Key Management

- API keys are long random strings (32+ bytes)
- Stored securely in environment variables
- Never committed to git
- Rotatable if compromised

### 2. Rate Limiting

Add rate limiting per tenant:
```ruby
# Gemfile
gem 'rack-attack'

# config/initializers/rack_attack.rb
Rack::Attack.throttle('api_requests_per_tenant', limit: 300, period: 60) do |req|
  if req.path.start_with?('/api/')
    api_key = req.env['HTTP_X_API_KEY']
    "tenant:#{api_key}" if api_key.present?
  end
end
```

### 3. SQL Injection Prevention

Always use parameterized queries (Rails does this by default):
```ruby
# Good (parameterized)
Listing.where(status: params[:status])

# Bad (SQL injection risk)
Listing.where("status = '#{params[:status]}'")
```

### 4. Default Scope Safety

Always use `default_scope` with safe conditions:
```ruby
# Safe
default_scope { where(tenant_id: Current.tenant&.id) if Current.tenant }

# Unsafe
default_scope { where(tenant_id: Current.tenant.id) }  # Can crash if nil
```

## Testing Strategy

### 1. Model Tests

```ruby
RSpec.describe Listing, type: :model do
  let(:tenant) { create(:tenant) }

  before { Current.tenant = tenant }
  after { Current.reset }

  it 'scopes to current tenant' do
    listing = create(:listing)
    expect(listing.tenant_id).to eq(tenant.id)
  end

  it 'isolates from other tenants' do
    other_tenant = create(:tenant)
    Current.tenant = other_tenant
    other_listing = create(:listing)

    Current.tenant = tenant
    expect(Listing.all).not_to include(other_listing)
  end
end
```

### 2. Controller Tests

```ruby
RSpec.describe Api::V1::ListingsController, type: :controller do
  let(:tenant) { create(:tenant) }

  before do
    request.headers['X-API-Key'] = tenant.api_key
  end

  it 'returns only tenant listings' do
    listing = create(:listing, tenant: tenant)
    other_listing = create(:listing) # Different tenant

    get :index

    expect(response).to be_successful
    expect(json_response).to include(listing.id)
    expect(json_response).not_to include(other_listing.id)
  end
end
```

### 3. Integration Tests

```ruby
RSpec.describe 'Multi-tenancy isolation', type: :request do
  let(:tenant_a) { create(:tenant) }
  let(:tenant_b) { create(:tenant) }

  it 'prevents cross-tenant data access' do
    listing_a = create(:listing, tenant: tenant_a)

    get "/api/v1/listings/#{listing_a.id}",
        headers: { 'X-API-Key' => tenant_b.api_key }

    expect(response).to have_http_status(:not_found)
  end
end
```

## Monitoring & Observability

### 1. Tenant Metrics

Track per-tenant usage:
- Request count
- Response times
- Error rates
- Active listings count
- Storage usage

### 2. Logging

Log tenant context in all requests:
```ruby
# config/initializers/lograge.rb
Rails.application.configure do
  config.lograge.enabled = true
  config.lograge.custom_options = lambda do |event|
    {
      tenant_id: Current.tenant&.id,
      tenant_slug: Current.tenant&.slug
    }
  end
end
```

### 3. Error Tracking (Sentry)

Tag errors with tenant:
```ruby
# config/initializers/sentry.rb
Sentry.init do |config|
  config.before_send = lambda do |event, hint|
    if Current.tenant
      event.tags[:tenant_id] = Current.tenant.id
      event.tags[:tenant_slug] = Current.tenant.slug
    end
    event
  end
end
```

## Performance Considerations

### 1. Indexing

Ensure tenant_id is indexed on all tables:
```ruby
add_index :listings, :tenant_id
add_index :blog_posts, :tenant_id
```

### 2. Composite Indexes

For frequently filtered queries:
```ruby
add_index :listings, [:tenant_id, :status]
add_index :listings, [:tenant_id, :created_at]
```

### 3. Query Optimization

Use `includes` to avoid N+1:
```ruby
Listing.includes(:listing_complex, :translations)
```

### 4. Caching

Cache per tenant:
```ruby
Rails.cache.fetch("listings/#{Current.tenant.id}/featured", expires_in: 1.hour) do
  Listing.featured.to_a
end
```

## Rollback Plan

If issues arise in production:

### 1. Disable Multi-Tenancy Temporarily

```ruby
# app/models/concerns/acts_as_tenant.rb
default_scope { all }  # Temporarily disable scoping
```

### 2. Roll Back Migrations

```bash
rails db:rollback STEP=5
```

### 3. Remove Middleware

```ruby
# config/application.rb
# Comment out:
# config.middleware.use TenantMiddleware
```

### 4. Deploy Hotfix

Quick rollback without full redeploy.

## Future Enhancements

### 1. Tenant Subdomain Support

Identify tenant by subdomain:
```ruby
# sgg.api.example.com -> SGG tenant
# newagency.api.example.com -> New Agency tenant
```

### 2. Tenant Admin Panel

Self-service tenant management:
- Feature flag toggles
- API key rotation
- Usage analytics
- Billing integration

### 3. Tenant-Specific Customization

Beyond feature flags:
- Custom branding colors
- Custom email templates
- Custom terminology (listings vs properties)

### 4. Cross-Tenant Reporting

Super admin dashboard:
- View all tenants
- Aggregate statistics
- System health

## Summary

This multi-tenancy architecture provides:

✅ **Data Isolation**: Each tenant's data is completely isolated
✅ **Feature Flexibility**: Features can be enabled/disabled per tenant
✅ **Security**: API key authentication prevents unauthorized access
✅ **Scalability**: Add new tenants without infrastructure changes
✅ **Maintainability**: Single codebase, easy to update and deploy
✅ **Cost-Effective**: Shared database and infrastructure

## References

- [Rails Multi-Tenancy Guide](https://guides.rubyonrails.org/active_record_querying.html)
- [ActsAsTenant Gem](https://github.com/ErwinM/acts_as_tenant)
- [Apartment Gem](https://github.com/influitive/apartment)
- [Current Attributes](https://api.rubyonrails.org/classes/ActiveSupport/CurrentAttributes.html)
