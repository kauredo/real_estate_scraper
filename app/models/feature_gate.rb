class FeatureGate < ActiveRecord::Base
  include Flipper::Adapters::ActiveRecord::Models::FlipperGate
end
