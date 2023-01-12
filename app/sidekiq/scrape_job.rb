# frozen_string_literal: true

class ScrapeJob < ActiveJob::Base
  require 'rake'
  queue_as :default

  def perform(*_args)
    Rails.application.load_tasks # <-- MISSING LINE
    Rake::Task['scrape'].invoke
    puts 'ScrapeJob is performed'

    puts 'DONE'
  end
end
