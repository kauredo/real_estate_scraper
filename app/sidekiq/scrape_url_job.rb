# frozen_string_literal: true

class ScrapeUrlJob < ApplicationJob
  require 'rake'
  queue_as :default

  def perform(id)
    Rails.logger.debug 'ScrapeJobUrl is being performed'
    Rails.application.load_tasks
    Rake::Task['scrape_one'].invoke(id)

    Rails.logger.debug 'DONE'
  end
end
