# frozen_string_literal: true

class FixStatusTypes < ActiveRecord::Migration[7.0]
  def change
    rename_column :listings, :status, :old_status
    add_column :listings, :status, :integer
  end
end
