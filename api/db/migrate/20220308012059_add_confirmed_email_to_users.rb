# frozen_string_literal: true

class AddConfirmedEmailToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :confirmed_email, :boolean
  end
end
