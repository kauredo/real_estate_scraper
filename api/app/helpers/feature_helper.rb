module FeatureHelper
  def feature_enabled?(feature_name)
    Flipper.enabled?(feature_name)
  end
end
