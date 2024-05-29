# frozen_string_literal: true

class ScrapeUrlJob
  include Sidekiq::Worker
  require 'rake'
  queue_as :priority

  def perform(url, force)
    Rails.logger.debug "ScrapeJobUrl is being performed for #{url}"
    Rails.application.load_tasks

    Rake::Task['scrape_one'].reenable
    Rake::Task['scrape_one'].invoke(url, force)
    Rake::Task['scrape_one'].reenable

    Rails.logger.debug 'DONE ScrapeUrlJob'
  end
end
