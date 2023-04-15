# frozen_string_literal: true

require 'sidekiq-scheduler'

class ScrapeAll
  include Sidekiq::Worker
  require 'rake'

  def perform
    Rails.logger.debug 'ScrapeAll is being performed'
    Rails.application.load_tasks

    ActiveRecord::Base.connection_pool.release_connection
    ActiveRecord::Base.connection_pool.with_connection do
      Rake::Task['scrape_all'].invoke
    end

    Rails.logger.debug 'ScrapeAll DONE'
  end
end
