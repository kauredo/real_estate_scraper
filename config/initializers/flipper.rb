require 'flipper'
require 'flipper/adapters/active_record'

Flipper.configure do |config|
  config.default { Flipper.new(Flipper::Adapters::ActiveRecord.new) }
end

# Ensure club_enabled flag exists (will not overwrite if exists)
Flipper.add(:club_enabled)
