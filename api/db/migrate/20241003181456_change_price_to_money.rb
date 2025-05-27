class ChangePriceToMoney < ActiveRecord::Migration[7.0]
  def up
    # change column name from price to price_string
    rename_column :listings, :price, :price_string
    add_monetize :listings, :price, currency: { present: false }

    # Use direct SQL instead of the Listing model to avoid enum issues
    execute <<-SQL
      UPDATE listings
      SET price_cents = (
        CASE
          WHEN price_string IS NULL THEN 0
          ELSE (REGEXP_REPLACE(price_string, '[^0-9]', '', 'g')::integer * 100)
        END
      )
    SQL

    # remove price_string column
    remove_column :listings, :price_string
  end

  def down
    remove_monetize :listings, :price, currency: { present: false }
    rename_column :listings, :price_string, :price
  end
end
