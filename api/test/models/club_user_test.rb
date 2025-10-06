require "test_helper"

class ClubUserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: club_users
#
#  id             :bigint           not null, primary key
#  email          :string
#  name           :string
#  phone          :string
#  status         :integer
#  terms_accepted :boolean
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  tenant_id      :bigint
#
# Indexes
#
#  index_club_users_on_tenant_id  (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
