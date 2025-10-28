# frozen_string_literal: true

class AddPerformanceIndexes < ActiveRecord::Migration[7.1]
  def change
    # Listings: Filter by objective (sale/rent) within tenant
    # Used in: /api/v1/listings?objective=sale
    add_index :listings, [:tenant_id, :status, :objective],
              name: 'index_listings_on_tenant_status_objective'

    # Listings: Filter by property type (kind) within tenant
    # Used in: /api/v1/listings?kind=apartment
    add_index :listings, [:tenant_id, :kind],
              name: 'index_listings_on_tenant_kind'

    # Listings: Most recent listings query optimization
    # Used in: Homepage "Recent Listings"
    add_index :listings, [:tenant_id, :status, :created_at],
              name: 'index_listings_on_tenant_status_created'

    # Blog Posts: Filter visible posts by tenant
    # Used in: /api/v1/blog_posts (excludes hidden posts)
    add_index :blog_posts, [:tenant_id, :hidden],
              name: 'index_blog_posts_on_tenant_hidden'

    # Blog Posts: Order posts by date within tenant
    # Used in: Blog listing pages
    add_index :blog_posts, [:tenant_id, :created_at],
              name: 'index_blog_posts_on_tenant_created',
              order: { created_at: :desc }

    # Listing Complexes: Filter visible complexes
    # Used in: /api/v1/listing_complexes
    add_index :listing_complexes, [:tenant_id, :hidden],
              name: 'index_listing_complexes_on_tenant_hidden'

    # Listing Complexes: Order by custom order field
    # Used in: Frontend listing complexes display
    add_index :listing_complexes, [:tenant_id, :order],
              name: 'index_listing_complexes_on_tenant_order',
              order: { order: :asc }

    # Users: Email lookup optimization
    # Used in: User authentication and newsletter signups
    add_index :users, [:tenant_id, :email],
              name: 'index_users_on_tenant_email'

    # Club Users: Email lookup for club membership
    # Used in: Club join requests
    add_index :club_users, [:tenant_id, :email],
              name: 'index_club_users_on_tenant_email'

    # Club Users: Status filtering
    # Used in: Admin backoffice club user management
    add_index :club_users, [:tenant_id, :status],
              name: 'index_club_users_on_tenant_status'

    # Club Stories: Filter visible stories
    # Used in: /api/v1/club_stories
    add_index :club_stories, [:tenant_id, :hidden],
              name: 'index_club_stories_on_tenant_hidden'

    # Newsletter Subscriptions: User lookup optimization
    # Used in: Newsletter management in backoffice
    add_index :newsletter_subscriptions, [:tenant_id, :created_at],
              name: 'index_newsletter_subs_on_tenant_created',
              order: { created_at: :desc }

    # Testimonials: Ordering by creation date
    # Used in: Homepage and testimonials page
    add_index :testimonials, [:tenant_id, :created_at],
              name: 'index_testimonials_on_tenant_created',
              order: { created_at: :desc }

    # Blog Photos: Main photo lookup optimization
    # Used in: Blog post serializers to find main photo
    add_index :blog_photos, [:blog_post_id, :main],
              name: 'index_blog_photos_on_post_main',
              where: 'main = true'

    # Club Story Photos: Main photo lookup
    # Used in: Club story serializers
    add_index :club_story_photos, [:club_story_id, :main],
              name: 'index_club_story_photos_on_story_main',
              where: 'main = true'

    # Photos: Main photo lookup for listing complexes
    # Used in: Listing complex serializers
    add_index :photos, [:listing_complex_id, :main],
              name: 'index_photos_on_complex_main',
              where: 'main = true'
  end
end
