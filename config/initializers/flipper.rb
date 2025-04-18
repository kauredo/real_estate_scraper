# frozen_string_literal: true

require 'flipper'
require 'flipper/adapters/active_record'

Rails.application.config.after_initialize do
  if ActiveRecord::Base.connection.table_exists?('flipper_features')
    Flipper.configure do |config|
      config.default do
        adapter = Flipper::Adapters::ActiveRecord.new
        Flipper.new(adapter)
      end
    end
  end
end
