class AddDeletedAtToListingTranslations < ActiveRecord::Migration[7.0]
  def change
    add_column :listing_translations, :deleted_at, :datetime
  end
end
