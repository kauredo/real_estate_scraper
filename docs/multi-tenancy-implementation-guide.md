# Multi-Tenancy Implementation Guide

This guide provides step-by-step instructions for implementing multi-tenancy in the Real Estate Scraper API.

## Prerequisites

- Ruby 3.1.3
- Rails 7.1
- PostgreSQL database
- Existing real_estate_scraper monorepo

## Implementation Steps

---

## Phase 1: Database & Models Foundation

### Step 1: Create Tenant Model

```bash
cd /Users/pixelmatters/code/personal/real_estate_scraper/api
rails generate model Tenant \
  name:string \
  slug:string \
  api_key:string \
  features:jsonb \
  metadata:jsonb \
  domain:string \
  contact_email:string \
  active:boolean
```

**Edit the generated migration:**

```ruby
# db/migrate/XXXXXX_create_tenants.rb
class CreateTenants < ActiveRecord::Migration[7.1]
  def change
    create_table :tenants do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :api_key, null: false
      t.jsonb :features, default: {}, null: false
      t.jsonb :metadata, default: {}, null: false
      t.string :domain
      t.string :contact_email
      t.boolean :active, default: true, null: false

      t.timestamps

      t.index :api_key, unique: true
      t.index :slug, unique: true
      t.index :domain
    end
  end
end
```

**Run migration:**
```bash
rails db:migrate
```

### Step 2: Update Tenant Model

```ruby
# app/models/tenant.rb
class Tenant < ApplicationRecord
  has_secure_token :api_key

  # Associations
  has_many :listings, dependent: :restrict_with_error
  has_many :blog_posts, dependent: :restrict_with_error
  has_many :admins, dependent: :restrict_with_error
  has_many :testimonials, dependent: :restrict_with_error
  has_many :variables, dependent: :restrict_with_error
  has_many :listing_complexes, dependent: :restrict_with_error
  has_many :club_stories, dependent: :restrict_with_error
  has_many :club_users, dependent: :restrict_with_error
  has_many :newsletter_subscriptions, dependent: :restrict_with_error

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true, format: { with: /\A[a-z0-9-]+\z/ }
  validates :api_key, presence: true, uniqueness: true
  validates :contact_email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true

  # Feature flags
  store_accessor :features,
                 :blog_enabled,
                 :club_enabled,
                 :testimonials_enabled,
                 :newsletter_enabled,
                 :listing_complexes_enabled

  # Scopes
  scope :active, -> { where(active: true) }

  # Callbacks
  before_validation :generate_slug, on: :create

  def feature_enabled?(feature_name)
    public_send("#{feature_name}_enabled") == true
  rescue NoMethodError
    false
  end

  private

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end
end
```

### Step 3: Create Current Context Model

```ruby
# app/models/current.rb
class Current < ActiveSupport::CurrentAttributes
  attribute :tenant
  attribute :admin

  def tenant?
    tenant.present?
  end

  def admin?
    admin.present?
  end
end
```

### Step 4: Add tenant_id to All Tenant-Scoped Tables

Create individual migrations for each model:

```bash
# Listings
rails generate migration AddTenantIdToListings tenant:references

# Blog
rails generate migration AddTenantIdToBlogPosts tenant:references
rails generate migration AddTenantIdToBlogPhotos tenant:references

# Listing Complexes & Photos
rails generate migration AddTenantIdToListingComplexes tenant:references
rails generate migration AddTenantIdToPhotos tenant:references

# Testimonials & Variables
rails generate migration AddTenantIdToTestimonials tenant:references
rails generate migration AddTenantIdToVariables tenant:references

# Club (SGG-specific)
rails generate migration AddTenantIdToClubStories tenant:references
rails generate migration AddTenantIdToClubStoryPhotos tenant:references
rails generate migration AddTenantIdToClubUsers tenant:references

# Newsletter & Admins
rails generate migration AddTenantIdToNewsletterSubscriptions tenant:references
rails generate migration AddTenantIdToAdmins tenant:references
```

**Edit migrations to allow NULL initially** (we'll populate data, then make NOT NULL):

```ruby
# Example: db/migrate/XXXXXX_add_tenant_id_to_listings.rb
class AddTenantIdToListings < ActiveRecord::Migration[7.1]
  def change
    add_reference :listings, :tenant, foreign_key: true, null: true
    add_index :listings, [:tenant_id, :status]
    add_index :listings, [:tenant_id, :created_at]
  end
end
```

**Run migrations:**
```bash
rails db:migrate
```

### Step 5: Create ActsAsTenant Concern

```ruby
# app/models/concerns/acts_as_tenant.rb
module ActsAsTenant
  extend ActiveSupport::Concern

  included do
    belongs_to :tenant
    validates :tenant_id, presence: true

    # Automatically scope all queries to current tenant
    default_scope { where(tenant_id: Current.tenant&.id) if Current.tenant }

    # Set tenant_id on create
    before_validation :set_tenant_id, on: :create

    # Prevent changing tenant
    before_update :prevent_tenant_change
  end

  class_methods do
    # Use unscoped to bypass tenant filtering (admin/system tasks only)
    def without_tenant
      unscoped
    end

    # Get records for specific tenant
    def for_tenant(tenant)
      unscoped.where(tenant_id: tenant.id)
    end
  end

  private

  def set_tenant_id
    self.tenant_id ||= Current.tenant&.id
  end

  def prevent_tenant_change
    if tenant_id_changed? && persisted?
      errors.add(:tenant_id, 'cannot be changed')
      throw :abort
    end
  end
end
```

### Step 6: Update All Tenant-Scoped Models

**Example: Listing Model**

```ruby
# app/models/listing.rb
class Listing < ApplicationRecord
  include ActsAsTenant

  extend Mobility
  extend FriendlyId

  # ... rest of the model code ...

  # Remove or adjust default_scope if it conflicts
  # default_scope { with_locale_translations.default_order }

  # Update to work with tenant scope:
  default_scope do
    scope = where(tenant_id: Current.tenant&.id) if Current.tenant
    scope = scope.with_locale_translations.default_order if scope
    scope || all
  end
end
```

**Repeat for all models:**

```ruby
# app/models/blog_post.rb
class BlogPost < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/blog_photo.rb
class BlogPhoto < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/listing_complex.rb
class ListingComplex < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/photo.rb
class Photo < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/testimonial.rb
class Testimonial < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/variable.rb
class Variable < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/club_story.rb
class ClubStory < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/club_story_photo.rb
class ClubStoryPhoto < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/club_user.rb
class ClubUser < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/newsletter_subscription.rb
class NewsletterSubscription < ApplicationRecord
  include ActsAsTenant
  # ...
end

# app/models/admin.rb
class Admin < ApplicationRecord
  include ActsAsTenant
  # ... (keep devise configuration)
end
```

### Step 7: Create Seed Data for SGG Tenant

```ruby
# db/seeds.rb

# Create SGG Tenant
sgg = Tenant.find_or_create_by!(slug: 'sgg') do |t|
  t.name = 'Sofia Galvao Group'
  t.domain = 'sofiagalvaogroup.com'
  t.contact_email = 'info@sofiagalvaogroup.com'
  t.active = true
  t.blog_enabled = true
  t.club_enabled = true
  t.testimonials_enabled = true
  t.newsletter_enabled = true
  t.listing_complexes_enabled = true
end

puts "SGG Tenant created!"
puts "API Key: #{sgg.api_key}"
puts "Save this API key securely - you'll need it for the frontend!"

# Create test tenant for development
if Rails.env.development?
  test_tenant = Tenant.find_or_create_by!(slug: 'test-agency') do |t|
    t.name = 'Test Agency'
    t.domain = 'test-agency.local'
    t.contact_email = 'test@example.com'
    t.active = true
    t.blog_enabled = true
    t.club_enabled = false  # Club disabled for test tenant
    t.testimonials_enabled = true
    t.newsletter_enabled = true
    t.listing_complexes_enabled = true
  end

  puts "\nTest Tenant created!"
  puts "API Key: #{test_tenant.api_key}"
end
```

**Run seeds:**
```bash
rails db:seed
```

### Step 8: Create Data Migration for Existing Data

```bash
rails generate data_migration AssignDataToSggTenant
```

```ruby
# db/data/XXXXXX_assign_data_to_sgg_tenant.rb
class AssignDataToSggTenant < ActiveRecord::Migration[7.1]
  def up
    sgg = Tenant.find_by(slug: 'sgg')

    unless sgg
      puts "Creating SGG tenant..."
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
      puts "SGG Tenant API Key: #{sgg.api_key}"
    end

    puts "Assigning existing data to SGG tenant..."

    # Use update_all to bypass validations and scopes
    models = [
      Listing, BlogPost, BlogPhoto,
      ListingComplex, Photo,
      Testimonial, Variable,
      ClubStory, ClubStoryPhoto, ClubUser,
      NewsletterSubscription, Admin
    ]

    models.each do |model|
      count = model.unscoped.where(tenant_id: nil).count
      next if count.zero?

      puts "Updating #{count} #{model.name} records..."
      model.unscoped.where(tenant_id: nil).update_all(tenant_id: sgg.id)
    end

    puts "Data migration complete!"
  end

  def down
    puts "Removing tenant assignments..."

    models = [
      Listing, BlogPost, BlogPhoto,
      ListingComplex, Photo,
      Testimonial, Variable,
      ClubStory, ClubStoryPhoto, ClubUser,
      NewsletterSubscription, Admin
    ]

    models.each do |model|
      model.unscoped.update_all(tenant_id: nil)
    end

    puts "Tenant assignments removed!"
  end
end
```

**Run data migration:**
```bash
rails data:migrate
```

### Step 9: Make tenant_id NOT NULL

After confirming all data is migrated:

```bash
rails generate migration MakeTenantIdNotNull
```

```ruby
# db/migrate/XXXXXX_make_tenant_id_not_null.rb
class MakeTenantIdNotNull < ActiveRecord::Migration[7.1]
  def change
    change_column_null :listings, :tenant_id, false
    change_column_null :blog_posts, :tenant_id, false
    change_column_null :blog_photos, :tenant_id, false
    change_column_null :listing_complexes, :tenant_id, false
    change_column_null :photos, :tenant_id, false
    change_column_null :testimonials, :tenant_id, false
    change_column_null :variables, :tenant_id, false
    change_column_null :club_stories, :tenant_id, false
    change_column_null :club_story_photos, :tenant_id, false
    change_column_null :club_users, :tenant_id, false
    change_column_null :newsletter_subscriptions, :tenant_id, false
    change_column_null :admins, :tenant_id, false
  end
end
```

**Run migration:**
```bash
rails db:migrate
```

---

## Phase 2: API Authentication & Scoping

### Step 10: Create Tenant Middleware

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
    # Always clear context after request
    Current.reset
  end

  private

  def extract_api_key(request)
    # Priority 1: X-API-Key header
    api_key = request.headers['X-API-Key']
    return api_key if api_key.present?

    # Priority 2: X-Tenant-Key header (alternative)
    api_key = request.headers['X-Tenant-Key']
    return api_key if api_key.present?

    # Priority 3: Query parameter (for webhooks, etc.)
    api_key = request.params['api_key']
    return api_key if api_key.present?

    nil
  end
end
```

### Step 11: Register Middleware

```ruby
# config/application.rb
module Api
  class Application < Rails::Application
    # ...

    # Add tenant middleware
    config.middleware.use TenantMiddleware

    # ...
  end
end
```

### Step 12: Update Base Controller

```ruby
# app/controllers/api/base_controller.rb
module Api
  class BaseController < ApplicationController
    include ActionController::MimeResponds
    include ApiErrorHandler
    include ApiPagination

    before_action :set_locale
    before_action :verify_tenant

    protected

    def authenticate_admin!
      header = request.headers['Authorization']
      return render json: { error: 'No token provided' }, status: :unauthorized unless header

      token = header.split(' ').last
      begin
        decoded = JsonWebToken.decode(token)
        return render json: { error: 'Invalid token' }, status: :unauthorized unless decoded

        @current_admin = Admin.find(decoded[:admin_id])

        # Verify admin belongs to current tenant
        unless @current_admin.tenant_id == Current.tenant&.id
          return render json: { error: 'Unauthorized - tenant mismatch' }, status: :unauthorized
        end
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    end

    private

    attr_reader :current_admin

    def verify_tenant
      unless Current.tenant
        render json: { error: 'Invalid or missing API key' }, status: :unauthorized
        return false
      end
    end

    def set_locale
      I18n.locale = params[:locale] || I18n.default_locale
    end

    def default_url_options
      { host: ENV['APP_DOMAIN'] || 'localhost:3000', locale: (I18n.locale == I18n.default_locale ? nil : I18n.locale) }
    end
  end
end
```

---

## Phase 3: Feature Flags System

### Step 13: Create FeatureFlag Concern

```ruby
# app/controllers/concerns/feature_flag.rb
module FeatureFlag
  extend ActiveSupport::Concern

  included do
    # Included in controllers that need feature flag checks
  end

  private

  def feature_enabled?(feature_name)
    return false unless Current.tenant

    Current.tenant.feature_enabled?(feature_name)
  end

  def require_feature!(feature_name)
    unless feature_enabled?(feature_name)
      # Return 404 instead of 403 to avoid leaking feature existence
      render json: { error: 'Not Found' }, status: :not_found
      return false
    end

    true
  end

  def with_feature_check(feature_name, &block)
    if feature_enabled?(feature_name)
      block.call
    else
      render json: { error: 'Feature not available' }, status: :not_found
    end
  end
end
```

### Step 14: Update Controllers with Feature Flags

**Blog Controllers:**

```ruby
# app/controllers/api/v1/blog_posts_controller.rb
module Api
  module V1
    class BlogPostsController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:blog) }

      def index
        @blog_posts = BlogPost.visible
        paginated = paginate(@blog_posts, serializer: BlogPostSerializer)

        render json: {
          blog_posts: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @blog_post = BlogPost.friendly.find(params[:id])
        render json: @blog_post,
               serializer: BlogPostSerializer,
               include_photos: true
      end
    end
  end
end
```

**Club Controllers:**

```ruby
# app/controllers/api/v1/club_controller.rb
module Api
  module V1
    class ClubController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:club) }

      def index
        # Club landing page data
        render json: { message: 'Club index' }
      end

      def join
        # Club join logic
        require_feature!(:club)

        club_user = ClubUser.new(club_user_params)

        if club_user.save
          render json: { success: true, message: 'Successfully joined the club' }, status: :created
        else
          render json: { errors: club_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def rules
        # Club rules page
        render json: { message: 'Club rules' }
      end

      private

      def club_user_params
        params.require(:club_user).permit(:name, :email, :phone, :terms_accepted)
      end
    end
  end
end

# app/controllers/api/v1/club_stories_controller.rb
module Api
  module V1
    class ClubStoriesController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:club) }

      def index
        @club_stories = ClubStory.visible
        paginated = paginate(@club_stories, serializer: ClubStorySerializer)

        render json: {
          club_stories: paginated[:data],
          pagination: paginated[:pagination]
        }
      end

      def show
        @club_story = ClubStory.friendly.find(params[:id])
        render json: @club_story, serializer: ClubStorySerializer
      end
    end
  end
end
```

**Testimonials Controller:**

```ruby
# app/controllers/api/v1/testimonials_controller.rb
module Api
  module V1
    class TestimonialsController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:testimonials) }

      def index
        @testimonials = Testimonial.all
        render json: @testimonials, each_serializer: TestimonialSerializer
      end
    end
  end
end
```

**Listing Complexes Controller:**

```ruby
# app/controllers/api/v1/listing_complexes_controller.rb
module Api
  module V1
    class ListingComplexesController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:listing_complexes) }, only: [:index, :show]

      def index
        @listing_complexes = ListingComplex.where(hidden: false).order(order: :asc)
        render json: @listing_complexes, each_serializer: ListingComplexSerializer
      end

      def show
        @listing_complex = ListingComplex.friendly.find(params[:id])
        render json: @listing_complex, serializer: ListingComplexSerializer
      end
    end
  end
end
```

**Newsletter Controller:**

```ruby
# app/controllers/api/v1/newsletter_subscriptions_controller.rb
module Api
  module V1
    class NewsletterSubscriptionsController < Api::V1::BaseController
      include FeatureFlag

      before_action -> { require_feature!(:newsletter) }, only: [:create]

      def create
        # Newsletter subscription logic
      end

      def confirm
        # Email confirmation logic
      end
    end
  end
end
```

---

## Phase 4: Admin & Authorization Updates

### Step 15: Update Admin Controllers

```ruby
# app/controllers/api/v1/admin/base_controller.rb
module Api
  module V1
    module Admin
      class BaseController < Api::V1::BaseController
        include FeatureFlag
        before_action :authenticate_admin!

        private

        def authenticate_admin!
          super

          # Additional check: ensure admin can only access resources for their tenant
          # This is already handled by default_scope, but we add explicit verification
          unless @current_admin&.tenant_id == Current.tenant&.id
            render json: { error: 'Unauthorized - admin tenant mismatch' }, status: :unauthorized
            return false
          end
        end
      end
    end
  end
end
```

**Admin Blog Controller with Feature Check:**

```ruby
# app/controllers/api/v1/admin/blog_posts_controller.rb
module Api
  module V1
    module Admin
      class BlogPostsController < Admin::BaseController
        before_action -> { require_feature!(:blog) }

        def index
          @q = BlogPost.ransack(params[:q])
          @blog_posts = @q.result
          paginated = paginate(@blog_posts, serializer: BlogPostSerializer)

          render json: {
            blog_posts: paginated[:data],
            pagination: paginated[:pagination]
          }
        end

        def create
          @blog_post = BlogPost.new(blog_post_params)

          if @blog_post.save
            render json: @blog_post, serializer: BlogPostSerializer, status: :created
          else
            render json: { errors: @blog_post.errors.full_messages }, status: :unprocessable_entity
          end
        end

        # ... other actions ...

        private

        def blog_post_params
          params.require(:blog_post).permit(:title, :text, :hidden, :video_link, :small_description)
        end
      end
    end
  end
end
```

### Step 16: Update Authentication Controller

```ruby
# app/controllers/api/v1/auth_controller.rb
module Api
  module V1
    class AuthController < Api::V1::BaseController
      skip_before_action :verify_tenant, only: [:login]

      def login
        # Extract tenant from API key first
        api_key = request.headers['X-API-Key']
        tenant = Tenant.find_by(api_key: api_key, active: true) if api_key

        unless tenant
          return render json: { error: 'Invalid API key' }, status: :unauthorized
        end

        # Set current tenant
        Current.tenant = tenant

        # Find admin belonging to this tenant
        admin = Admin.find_by(email: params[:email], tenant_id: tenant.id)

        if admin&.valid_password?(params[:password])
          if admin.confirmed
            token = JsonWebToken.encode(admin_id: admin.id, tenant_id: tenant.id)
            render json: { token: token, admin: admin.as_json(only: [:id, :email]) }
          else
            render json: { error: 'Please confirm your account first' }, status: :unauthorized
          end
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def logout
        # Implement logout logic if needed
        head :no_content
      end
    end
  end
end
```

---

## Phase 5: Frontend Updates

### Step 17: Update Frontend Environment Variables

```bash
# frontend/.env.production
VITE_API_URL=https://api-production-329b.up.railway.app/api/v1
VITE_API_KEY=<SGG_API_KEY_FROM_SEEDS>

# frontend/.env.development
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_KEY=<SGG_API_KEY_FROM_SEEDS>
```

### Step 18: Update API Service

```typescript
// frontend/src/utils/routes.ts
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const API_KEY = import.meta.env.VITE_API_KEY || "";

// Helper to get headers with API key
export const getApiHeaders = () => ({
  "Content-Type": "application/json",
  "X-API-Key": API_KEY,
});
```

### Step 19: Update All API Calls

Find all `fetch` calls and add the API key header:

```typescript
// Example: frontend/src/components/listings/ListingsPage.tsx

import { API_BASE_URL, getApiHeaders } from "@/utils/routes";

const response = await fetch(`${API_BASE_URL}/listings`, {
  headers: getApiHeaders(),
});
```

**Or create a centralized API client:**

```typescript
// frontend/src/utils/api-client.ts
import { API_BASE_URL, getApiHeaders } from "./routes";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "GET",
      headers: {
        ...getApiHeaders(),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: "POST",
      headers: {
        ...getApiHeaders(),
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Add put, patch, delete methods as needed
}

export const apiClient = new ApiClient(API_BASE_URL);
```

**Usage:**

```typescript
// frontend/src/hooks/useListings.ts
import { apiClient } from "@/utils/api-client";

export const useListings = () => {
  const fetchListings = async () => {
    const data = await apiClient.get("/listings");
    return data;
  };

  // ...
};
```

---

## Phase 6: Testing

### Step 20: Create Tenant Factory

```ruby
# test/factories/tenants.rb (if using FactoryBot)
# OR spec/factories/tenants.rb (if using RSpec)

FactoryBot.define do
  factory :tenant do
    sequence(:name) { |n| "Agency #{n}" }
    sequence(:slug) { |n| "agency-#{n}" }
    api_key { SecureRandom.hex(32) }
    active { true }
    domain { "#{slug}.com" }
    contact_email { "info@#{slug}.com" }

    # Default features
    blog_enabled { true }
    club_enabled { false }
    testimonials_enabled { true }
    newsletter_enabled { true }
    listing_complexes_enabled { true }

    trait :with_all_features do
      blog_enabled { true }
      club_enabled { true }
      testimonials_enabled { true }
      newsletter_enabled { true }
      listing_complexes_enabled { true }
    end

    trait :minimal_features do
      blog_enabled { false }
      club_enabled { false }
      testimonials_enabled { true }
      newsletter_enabled { false }
      listing_complexes_enabled { false }
    end

    trait :inactive do
      active { false }
    end
  end
end
```

### Step 21: Update Model Tests

```ruby
# test/models/listing_test.rb
require 'test_helper'

class ListingTest < ActiveSupport::TestCase
  setup do
    @tenant = create(:tenant)
    Current.tenant = @tenant
  end

  teardown do
    Current.reset
  end

  test 'should be scoped to current tenant' do
    listing = create(:listing)
    assert_equal @tenant.id, listing.tenant_id
  end

  test 'should isolate from other tenants' do
    listing = create(:listing)

    other_tenant = create(:tenant)
    Current.tenant = other_tenant
    other_listing = create(:listing)

    Current.tenant = @tenant
    assert_not_includes Listing.all, other_listing
    assert_includes Listing.all, listing
  end

  test 'should not allow changing tenant' do
    listing = create(:listing)
    other_tenant = create(:tenant)

    listing.tenant_id = other_tenant.id
    assert_not listing.save
    assert_includes listing.errors[:tenant_id], 'cannot be changed'
  end
end
```

### Step 22: Update Controller Tests

```ruby
# test/controllers/api/v1/listings_controller_test.rb
require 'test_helper'

class Api::V1::ListingsControllerTest < ActionController::TestCase
  setup do
    @tenant = create(:tenant)
    @request.headers['X-API-Key'] = @tenant.api_key
  end

  test 'should get index with valid API key' do
    create_list(:listing, 3, tenant: @tenant)

    get :index
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal 3, json['listings'].length
  end

  test 'should not see other tenant listings' do
    our_listing = create(:listing, tenant: @tenant)
    other_tenant = create(:tenant)
    other_listing = create(:listing, tenant: other_tenant)

    get :index
    assert_response :success

    json = JSON.parse(response.body)
    listing_ids = json['listings'].map { |l| l['id'] }

    assert_includes listing_ids, our_listing.id
    assert_not_includes listing_ids, other_listing.id
  end

  test 'should return unauthorized without API key' do
    @request.headers['X-API-Key'] = nil

    get :index
    assert_response :unauthorized
  end

  test 'should return unauthorized with invalid API key' do
    @request.headers['X-API-Key'] = 'invalid-key'

    get :index
    assert_response :unauthorized
  end
end
```

### Step 23: Add Integration Tests

```ruby
# test/integration/multi_tenancy_test.rb
require 'test_helper'

class MultiTenancyTest < ActionDispatch::IntegrationTest
  setup do
    @tenant_a = create(:tenant, slug: 'agency-a')
    @tenant_b = create(:tenant, slug: 'agency-b')

    @listing_a = create(:listing, tenant: @tenant_a)
    @listing_b = create(:listing, tenant: @tenant_b)
  end

  test 'tenant A cannot access tenant B data' do
    get api_v1_listings_url,
        headers: { 'X-API-Key' => @tenant_a.api_key }

    assert_response :success
    json = JSON.parse(response.body)
    listing_ids = json['listings'].map { |l| l['id'] }

    assert_includes listing_ids, @listing_a.id
    assert_not_includes listing_ids, @listing_b.id
  end

  test 'feature flags prevent access to disabled features' do
    # Disable blog for tenant A
    @tenant_a.update!(blog_enabled: false)

    get api_v1_blog_posts_url,
        headers: { 'X-API-Key' => @tenant_a.api_key }

    assert_response :not_found
  end

  test 'admin can only access their tenant data' do
    admin_a = create(:admin, tenant: @tenant_a)
    token_a = JsonWebToken.encode(admin_id: admin_a.id, tenant_id: @tenant_a.id)

    get api_v1_admin_listings_url,
        headers: {
          'X-API-Key' => @tenant_a.api_key,
          'Authorization' => "Bearer #{token_a}"
        }

    assert_response :success
    json = JSON.parse(response.body)
    listing_ids = json['listings'].map { |l| l['id'] }

    assert_includes listing_ids, @listing_a.id
    assert_not_includes listing_ids, @listing_b.id
  end
end
```

---

## Phase 7: Deployment

### Step 24: Update Production Environment

```bash
# On Railway or your hosting platform

# Add CORS origins including all tenant domains
railway variables set CORS_ORIGINS="https://sofiagalvaogroup.com,https://*.vercel.app"

# Ensure database URL is set
railway variables set DATABASE_URL="<your_postgres_url>"

# Other required env vars
railway variables set RAILS_ENV=production
railway variables set RAILS_MASTER_KEY=<your_master_key>
```

### Step 25: Deploy to Staging

```bash
# Assuming you have a staging environment
git checkout -b multi-tenancy-deployment
git add .
git commit -m "Implement multi-tenancy architecture"
git push origin multi-tenancy-deployment

# Deploy to staging
# Test with SGG API key
# Test with a second test tenant
```

### Step 26: Production Deployment Checklist

- [ ] Database backup created
- [ ] All migrations tested in staging
- [ ] Data migration verified (all records have tenant_id)
- [ ] SGG API key generated and saved
- [ ] Frontend updated with SGG API key
- [ ] CORS origins updated
- [ ] Error tracking (Sentry) tested
- [ ] Monitoring enabled
- [ ] Rollback plan documented
- [ ] Team notified of deployment window

### Step 27: Deploy to Production

```bash
# Create production database backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Deploy
git checkout main
git merge multi-tenancy-deployment
git push origin main

# Run migrations
railway run rails db:migrate
railway run rails data:migrate

# Verify deployment
curl -H "X-API-Key: $SGG_API_KEY" https://api-production-329b.up.railway.app/api/v1/listings
```

---

## Phase 8: Adding a New Tenant

### Step 28: Create New Tenant Procedure

```ruby
# In Rails console on production
tenant = Tenant.create!(
  name: 'New Real Estate Agency',
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

# Save API key securely
puts "API Key for #{tenant.name}: #{tenant.api_key}"
# => API Key for New Real Estate Agency: abc123...
```

### Step 29: Update CORS for New Tenant

```bash
# Add new tenant domain to CORS
railway variables set CORS_ORIGINS="https://sofiagalvaogroup.com,https://newagency.com,https://*.vercel.app"
```

### Step 30: Provide Client Credentials

Send to client:
```
API Base URL: https://api-production-329b.up.railway.app/api/v1
API Key: <their_unique_api_key>

Features Enabled:
- Listings: Yes
- Blog: Yes
- Testimonials: Yes
- Newsletter: Yes
- Listing Complexes: No
- Club: No

Frontend Environment Variables:
VITE_API_URL=https://api-production-329b.up.railway.app/api/v1
VITE_API_KEY=<their_api_key>
```

---

## Troubleshooting

### Issue: "Invalid or missing API key"

**Solution:** Ensure `X-API-Key` header is sent with every request.

```bash
curl -H "X-API-Key: YOUR_API_KEY" https://api.example.com/api/v1/listings
```

### Issue: No data returned (empty arrays)

**Solution:** Check if `Current.tenant` is being set correctly.

```ruby
# In controller, add temporary debug logging
Rails.logger.info "Current Tenant: #{Current.tenant.inspect}"
```

### Issue: "Tenant cannot be changed" error

**Solution:** Don't try to update `tenant_id` on existing records. If you need to transfer data, use:

```ruby
# Use unscoped and skip validations
Listing.unscoped.find(id).update_column(:tenant_id, new_tenant.id)
```

### Issue: Admin cannot log in after migration

**Solution:** Ensure admin has `tenant_id` set:

```ruby
admin = Admin.find_by(email: 'admin@example.com')
admin.update_column(:tenant_id, sgg_tenant.id)
```

### Issue: Tests failing with "tenant_id can't be blank"

**Solution:** Set `Current.tenant` in test setup:

```ruby
setup do
  @tenant = create(:tenant)
  Current.tenant = @tenant
end

teardown do
  Current.reset
end
```

---

## Summary

You've now successfully implemented multi-tenancy! The system now supports:

✅ Multiple tenants with isolated data
✅ API key authentication per tenant
✅ Feature flags per tenant
✅ Admin scoping to tenants
✅ Secure data isolation
✅ Easy addition of new tenants

## Next Steps

1. Monitor production for any issues
2. Add tenant analytics dashboard
3. Implement API key rotation
4. Add tenant self-service portal
5. Document API for clients
