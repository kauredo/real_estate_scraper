# frozen_string_literal: true

class DropColleagues < ActiveRecord::Migration[7.0]
  def change
    drop_table :colleagues
  end
end
