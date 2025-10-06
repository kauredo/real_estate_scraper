# frozen_string_literal: true

class NewsletterSubscription < ApplicationRecord
  include ActsAsTenant
  belongs_to :user
end

# == Schema Information
#
# Table name: newsletter_subscriptions
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tenant_id  :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_newsletter_subscriptions_on_tenant_id  (tenant_id)
#  index_newsletter_subscriptions_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#  fk_rails_...  (user_id => users.id)
#
