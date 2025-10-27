# frozen_string_literal: true

require 'test_helper'

class TenantTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: tenants
#
#  id                 :bigint           not null, primary key
#  active             :boolean          default(TRUE), not null
#  address            :text
#  agency_name        :string
#  api_key            :string           not null
#  contact_email      :string
#  domain             :string
#  email_branding     :jsonb            not null
#  features           :jsonb            not null
#  from_email         :string
#  frontend_url       :string
#  metadata           :jsonb            not null
#  name               :string           not null
#  phone              :string
#  reply_to_email     :string
#  scraper_source_url :string
#  slug               :string           not null
#  website_url        :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_tenants_on_active   (active)
#  index_tenants_on_api_key  (api_key) UNIQUE
#  index_tenants_on_domain   (domain)
#  index_tenants_on_slug     (slug) UNIQUE
#
