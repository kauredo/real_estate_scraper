class AddScraperSourceUrlToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :scraper_source_url, :string unless column_exists? :tenants, :scraper_source_url
  end
end
