# frozen_string_literal: true

require 'sidekiq/api'

# Configuration thresholds kinda at random
MAX_QUEUE_SIZE = 100  # Max jobs in the queue
MAX_RETRY_SIZE = 10   # Max jobs in the retry queue

begin
  stats = Sidekiq::Stats.new
  retry_set = Sidekiq::RetrySet.new

  if stats.enqueued > MAX_QUEUE_SIZE
    puts "Unhealthy: Too many jobs in the queue (#{stats.enqueued} jobs)"
    exit(1)
  elsif retry_set.size > MAX_RETRY_SIZE
    puts "Unhealthy: Too many jobs in retry (#{retry_set.size} jobs)"
    exit(1)
  else
    puts "Healthy: #{stats.enqueued} jobs queued, #{retry_set.size} in retry"
    exit(0)
  end
rescue StandardError => e
  puts "Unhealthy: Error checking Sidekiq - #{e.message}"
  exit(1)
end
