# frozen_string_literal: true

class ScrapeUrlJob
  include Sidekiq::Worker
  require 'rake'
  queue_as :default

  def perform(url)
    Rails.logger.debug "ScrapeJobUrl is being performed for #{url}"
    Rails.application.load_tasks

    ActiveRecord::Base.connection_pool.release_connection
    ActiveRecord::Base.connection_pool.with_connection do
      Rake::Task['scrape_one'].invoke(url)
    end

    Rails.logger.debug 'DONE'
  end
end
