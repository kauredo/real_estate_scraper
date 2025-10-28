# frozen_string_literal: true

# Cacheable concern for controllers
# Provides common caching methods for API responses
module Cacheable
  extend ActiveSupport::Concern

  included do
    # Set cache store to Redis
    def cache_store
      Rails.cache
    end
  end

  # Cache a JSON response for a specific time
  # Usage: cache_json('listings', expires_in: 5.minutes) { @listings }
  def cache_json(key, options = {}, &block)
    tenant_key = "tenant_#{Current.tenant&.id}/#{key}"
    expires_in = options.delete(:expires_in) || 5.minutes

    cached_data = cache_store.fetch(tenant_key, expires_in:, **options) do
      result = block.call
      # Store as JSON to avoid serialization issues
      result.as_json
    end

    # Return as JSON if not already
    cached_data.is_a?(String) ? cached_data : cached_data.to_json
  end

  # Expire cache for a specific tenant and key
  def expire_cache(key)
    tenant_key = "tenant_#{Current.tenant&.id}/#{key}"
    cache_store.delete(tenant_key)
  end

  # Expire all cache for current tenant
  def expire_tenant_cache
    return unless Current.tenant

    # Delete all keys matching the tenant pattern
    cache_store.delete_matched("tenant_#{Current.tenant.id}/*")
  end

  # Set HTTP caching headers for responses
  def set_cache_headers(max_age: 5.minutes, public_cache: true)
    expires_in max_age, public: public_cache
    fresh_when(
      etag: [Current.tenant&.id, controller_name, action_name, params.to_unsafe_h],
      last_modified: Current.tenant&.updated_at,
      public: public_cache
    )
  end
end
