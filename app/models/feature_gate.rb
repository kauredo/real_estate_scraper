# frozen_string_literal: true

class FeatureGate < ApplicationRecord
  # Include Flipper::Model::Gate to enable the feature gate functionality
  # This allows you to use the Flipper gem to manage feature flags in your application
  # For more information, visit
  include Flipper::Model::Gate
end
