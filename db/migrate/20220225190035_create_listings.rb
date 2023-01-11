# frozen_string_literal: true

class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.json :stats
      t.string :address
      t.string :features, array: true, default: []
      t.string :price
      t.string :title
      t.string :url
      t.text :description
      t.text :photos, array: true, default: []

      t.timestamps
    end
  end
end
