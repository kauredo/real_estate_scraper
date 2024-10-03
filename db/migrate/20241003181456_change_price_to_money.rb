class ChangePriceToMoney < ActiveRecord::Migration[7.0]
  def up
    # change column name from price to price_string
    rename_column :listings, :price, :price_string

    add_monetize :listings, :price, currency: { present: false }

    # update price with the value from price_string
    Listing.find_each do |listing|
      # convert from "750.000" to 75000000
      listing.update(price_cents: listing.price_string.to_i * 1000 * 100)
    end

    # remove price_string column
    remove_column :listings, :price_string
  end

  def down
    remove_monetize :listings, :price

    rename_column :listings, :price_string, :price
  end
end
