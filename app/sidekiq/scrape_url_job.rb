# frozen_string_literal: true

class ScrapeUrlJob < ActiveJob::Base
  require 'rake'
  queue_as :default

  def perform(id)
    puts 'ScrapeJobUrl is being performed'
    Rails.application.load_tasks
    Rake::Task['scrape_one'].invoke(id)

    puts 'DONE'
  end
end
