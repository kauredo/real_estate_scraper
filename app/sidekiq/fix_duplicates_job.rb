# frozen_string_literal: true

require 'sidekiq-scheduler'

class FixDuplicatesJob
  include Sidekiq::Worker
  require 'rake'
  queue_as :default

  def perform
    ScrapeListingDetails.log 'FixDuplicatesJob is being performed'
    Rails.application.load_tasks

    Rake::Task['fix_duplicates'].reenable
    Rake::Task['fix_duplicates'].invoke
    Rake::Task['fix_duplicates'].reenable

    ScrapeListingDetails.log 'FixDuplicatesJob DONE'
  end
end
