# frozen_string_literal: true

class CreateNewsletterSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :newsletter_subscriptions do |t|
      t.references :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
