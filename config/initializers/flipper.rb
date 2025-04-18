require 'flipper'
require 'flipper/adapters/active_record'

Rails.application.config.after_initialize do
  if ActiveRecord::Base.connection.table_exists?('flipper_features')
    Flipper.configure do |config|
      config.default { Flipper.new(Flipper::Adapters::ActiveRecord.new) }
    end
  end
end
