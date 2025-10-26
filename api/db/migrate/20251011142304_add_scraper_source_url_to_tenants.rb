class AddScraperSourceUrlToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :scraper_source_url, :string
  end
end
