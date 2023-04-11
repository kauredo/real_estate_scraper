# frozen_string_literal: true

task disable_database_environment_check: :environment do
  ENV[‘DISABLE_DATABASE_ENVIRONMENT_CHECK’] = ‘1’
end
