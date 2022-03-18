class CreateColleagues < ActiveRecord::Migration[7.0]
  def change
    create_table :colleagues do |t|
      t.string :url
      t.string :name

      t.timestamps
    end
  end
end
