class CreatePhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :photos do |t|
      t.text :image
      t.boolean :main, default: false
      t.integer :order
      t.references :listing_complex
      t.timestamps
    end
  end
end
