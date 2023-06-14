# frozen_string_literal: true

require 'sidekiq'
require 'sidekiq-scheduler'

Sidekiq.configure_server do |config|
  config.on(:startup) do
    Sidekiq.schedule = if Rails.env.staging? || Rails.env.development?
                         YAML.load_file(File.expand_path('../sidekiq_scheduler_dev.yml', __dir__))
                       else
                         YAML.load_file(File.expand_path('../sidekiq_scheduler.yml', __dir__))
                       end
    SidekiqScheduler::Scheduler.instance.reload_schedule!
  end
end
