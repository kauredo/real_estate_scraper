# frozen_string_literal: true

class AddVideoLinkToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :video_link, :string
  end
end
