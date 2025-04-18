class FeatureFlag < ActiveRecord::Base
  include Flipper::Adapters::ActiveRecord::Models::FlipperFeature
end
