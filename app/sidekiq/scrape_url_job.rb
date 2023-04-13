# frozen_string_literal: true

class ScrapeUrlJob
  include Sidekiq::Worker
  require 'rake'
  queue_as :default

  def perform(id)
    Rails.logger.debug "ScrapeJobUrl is being performed for #{id}"
    Rails.application.load_tasks

    ActiveRecord::Base.connection_pool.release_connection
    ActiveRecord::Base.connection_pool.with_connection do
      Rake::Task['scrape_one'].invoke(id)
    end

    Rails.logger.debug 'DONE'
  end
end
