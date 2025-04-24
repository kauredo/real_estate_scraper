class AddClubEnabledFlag < ActiveRecord::Migration[7.1]
  def up
    return unless defined?(Flipper)

    Flipper.add(:club_enabled)

    Flipper[:club_enabled].enable
  end

  def down
    return unless defined?(Flipper)

    Flipper.remove(:club_enabled)
  end
end
