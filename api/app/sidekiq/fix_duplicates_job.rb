# frozen_string_literal: true

class FixDuplicatesJob < ApplicationJob
  require 'rake'

  def perform(tenant_id)
    ScrapeListingDetails.log '[FixDuplicatesJob] is being performed'
    Rails.application.load_tasks

    Rake::Task['listings:fix_duplicates'].reenable
    Rake::Task['listings:fix_duplicates'].invoke
    Rake::Task['listings:fix_duplicates'].reenable

    ScrapeListingDetails.log '[FixDuplicatesJob] DONE'
  end
end
