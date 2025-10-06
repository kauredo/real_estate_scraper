# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_secure_token :api_key

  # Associations (will be added as we create migrations)
  has_many :listings, dependent: :restrict_with_error
  has_many :blog_posts, dependent: :restrict_with_error
  has_many :blog_photos, dependent: :restrict_with_error
  has_many :admins, dependent: :restrict_with_error
  has_many :testimonials, dependent: :restrict_with_error
  has_many :variables, dependent: :restrict_with_error
  has_many :listing_complexes, dependent: :restrict_with_error
  has_many :photos, dependent: :restrict_with_error
  has_many :club_stories, dependent: :restrict_with_error
  has_many :club_story_photos, dependent: :restrict_with_error
  has_many :club_users, dependent: :restrict_with_error
  has_many :newsletter_subscriptions, dependent: :restrict_with_error
  has_many :users, dependent: :restrict_with_error

  # Validations
  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true,
                   format: { with: /\A[a-z0-9-]+\z/, message: 'only lowercase letters, numbers, and hyphens' }
  validates :api_key, presence: true, uniqueness: true
  validates :contact_email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true

  # Feature flags - stored in features JSONB column
  store_accessor :features,
                 :blog_enabled,
                 :club_enabled,
                 :testimonials_enabled,
                 :newsletter_enabled,
                 :listing_complexes_enabled

  # Scopes
  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  # Callbacks
  before_validation :generate_slug, on: :create
  before_validation :set_default_features, on: :create

  # Check if a feature is enabled
  def feature_enabled?(feature_name)
    public_send("#{feature_name}_enabled") == true
  rescue NoMethodError
    false
  end

  # Get all enabled features
  def enabled_features
    %i[blog club testimonials newsletter listing_complexes].select do |feature|
      feature_enabled?(feature)
    end
  end

  # Rotate API key (for security)
  def rotate_api_key!
    regenerate_api_key
    save!
  end

  private

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end

  def set_default_features
    # Default all features to true for new tenants
    self.blog_enabled = true if blog_enabled.nil?
    self.club_enabled = false if club_enabled.nil? # Club is SGG-specific by default
    self.testimonials_enabled = true if testimonials_enabled.nil?
    self.newsletter_enabled = true if newsletter_enabled.nil?
    self.listing_complexes_enabled = true if listing_complexes_enabled.nil?
  end
end

# == Schema Information
#
# Table name: tenants
#
#  id            :bigint           not null, primary key
#  active        :boolean          default(TRUE), not null
#  api_key       :string           not null
#  contact_email :string
#  domain        :string
#  features      :jsonb            not null
#  metadata      :jsonb            not null
#  name          :string           not null
#  slug          :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_tenants_on_active   (active)
#  index_tenants_on_api_key  (api_key) UNIQUE
#  index_tenants_on_domain   (domain)
#  index_tenants_on_slug     (slug) UNIQUE
#
