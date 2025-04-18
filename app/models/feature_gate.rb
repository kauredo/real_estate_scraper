class FeatureGate < ActiveRecord::Base
  include Flipper::Model::Gate
end
