# frozen_string_literal: true

require 'flipper'
require 'flipper/adapters/active_record'

unless ENV['RAILS_GROUPS'] == 'assets'
  Rails.application.config.after_initialize do
    # Check if we can connect to the database first
    ActiveRecord::Base.connection.execute('SELECT 1')

    if ActiveRecord::Base.connection.table_exists?('flipper_features')
      Flipper.configure do |config|
        config.default do
          adapter = Flipper::Adapters::ActiveRecord.new
          Flipper.new(adapter)
        end
      end
    end
  rescue ActiveRecord::NoDatabaseError, PG::ConnectionBad => e
    # Database doesn't exist yet, skip Flipper initialization
    Rails.logger.info "Skipping Flipper initialization - database not available: #{e.message}"
  end
end
