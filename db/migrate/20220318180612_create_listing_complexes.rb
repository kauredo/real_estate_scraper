# frozen_string_literal: true

class CreateListingComplexes < ActiveRecord::Migration[7.0]
  def change
    create_table :listing_complexes do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
