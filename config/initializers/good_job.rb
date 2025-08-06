# frozen_string_literal: true

Rails.application.configure do
  # Configure GoodJob
  config.good_job = {
    # Maximum time a job can run before being considered stuck
    job_timeout: 20.minutes,

    # Cleanup old jobs
    cleanup_preserved_jobs_before_seconds_ago: 1.week.to_i,

    # Enable web dashboard
    enable_listen_notify: true,

    # Job cleanup
    cleanup_interval_jobs: 1000,
    cleanup_interval_seconds: 600
  }
end
