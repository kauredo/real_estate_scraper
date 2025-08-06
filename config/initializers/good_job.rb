# frozen_string_literal: true

Rails.application.configure do
  # Configure GoodJob
  config.good_job.enable_cron = true
  config.good_job.cleanup_preserved_jobs_before_seconds_ago = 1.week.to_i
  config.good_job.cleanup_interval_jobs = 1000
  config.good_job.cleanup_interval_seconds = 600
end
