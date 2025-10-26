class CreateClubUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :club_users do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.integer :status
      t.boolean :terms_accepted

      t.timestamps
    end
  end
end
