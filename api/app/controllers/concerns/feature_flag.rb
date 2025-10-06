# frozen_string_literal: true

# Concern for controllers that need to check feature flags
# Provides methods to verify if a feature is enabled for the current tenant
module FeatureFlag
  extend ActiveSupport::Concern

  private

  # Check if a feature is enabled for the current tenant
  def feature_enabled?(feature_name)
    return false unless Current.tenant

    Current.tenant.feature_enabled?(feature_name)
  end

  # Require a feature to be enabled, otherwise return 404
  # Returns 404 instead of 403 to avoid leaking feature existence
  def require_feature!(feature_name)
    unless feature_enabled?(feature_name)
      render json: { error: 'Not Found' }, status: :not_found
      return false
    end

    true
  end

  # Execute block only if feature is enabled
  def with_feature(feature_name, &block)
    if feature_enabled?(feature_name)
      block.call
    else
      render json: { error: 'Feature not available' }, status: :not_found
    end
  end
end
