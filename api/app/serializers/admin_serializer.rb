# frozen_string_literal: true

class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email, :confirmed, :tenant_id, :created_at, :updated_at

  belongs_to :tenant, optional: true

  # Include additional details when requested
  attribute :last_sign_in_at, if: :include_details?
  attribute :sign_in_count, if: :include_details?

  def include_details?
    instance_options[:include_details]
  end

  def last_sign_in_at
    object.respond_to?(:last_sign_in_at) ? object.last_sign_in_at : nil
  end

  def sign_in_count
    object.respond_to?(:sign_in_count) ? object.sign_in_count : nil
  end

  def tenant
    return nil if object.tenant_id.nil?

    {
      id: object.tenant.id,
      name: object.tenant.name,
      slug: object.tenant.slug
    }
  end
end

# == Schema Information
#
# Table name: admins
#
#  id                     :bigint           not null, primary key
#  confirmed              :boolean          default(FALSE)
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  tenant_id              :bigint
#
# Indexes
#
#  index_admins_on_email                 (email) UNIQUE
#  index_admins_on_reset_password_token  (reset_password_token) UNIQUE
#  index_admins_on_tenant_id             (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
