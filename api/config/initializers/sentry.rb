# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = ENV['SENTRY_URL']
  config.breadcrumbs_logger = %i[active_support_logger http_logger]
  config.enabled_environments = %w[production]
  config.traces_sample_rate = 0.2
  config.logger = Logger.new(nil)
end
