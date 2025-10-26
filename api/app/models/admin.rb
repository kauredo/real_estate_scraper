# frozen_string_literal: true

class Admin < ApplicationRecord
  # Admin has special tenant handling:
  # - Tenant admins have tenant_id (belongs to one tenant)
  # - Super admins have tenant_id = NULL (can access all tenants)
  belongs_to :tenant, optional: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Validations - tenant_id required for tenant admins, but not super admins
  # (role will be added in next migration)
  validates :tenant_id, presence: true, unless: -> { super_admin? }

  # Temporary role check (will be replaced when role column is added)
  def super_admin?
    # For now, admins without tenant_id are super admins
    tenant_id.nil?
  end

  def tenant_admin?
    !super_admin?
  end

  # Super admins can access all tenants
  def accessible_tenants
    if super_admin?
      Tenant.all
    else
      Tenant.where(id: tenant_id)
    end
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
