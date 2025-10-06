class AddTenantIdToNewsletterSubscriptions < ActiveRecord::Migration[7.1]
  def change
    add_reference :newsletter_subscriptions, :tenant, null: true, foreign_key: true
  end
end
