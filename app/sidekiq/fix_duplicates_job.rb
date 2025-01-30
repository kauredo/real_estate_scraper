# frozen_string_literal: true

class FixDuplicatesJob < ApplicationJob
  require 'rake'

  def perform
    ScrapeListingDetails.log '[FixDuplicatesJob] is being performed'
    Rails.application.load_tasks

    Rake::Task['fix_duplicates'].reenable
    Rake::Task['fix_duplicates'].invoke
    Rake::Task['fix_duplicates'].reenable

    ScrapeListingDetails.log '[FixDuplicatesJob] DONE'
  end
end
