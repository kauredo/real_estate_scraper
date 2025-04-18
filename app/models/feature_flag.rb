# frozen_string_literal: true

class FeatureFlag < ApplicationRecord
  # Include Flipper::Model::Feature module to use Flipper for feature flags
  # This allows you to use the Flipper gem to manage feature flags in your application
  # For more information, visit
  include Flipper::Model::Feature
end
