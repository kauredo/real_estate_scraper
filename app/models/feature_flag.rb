class FeatureFlag < ActiveRecord::Base
  include Flipper::Model::Feature
end
