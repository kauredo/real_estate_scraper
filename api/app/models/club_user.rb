# frozen_string_literal: true

class ClubUser < ApplicationRecord
  include ActsAsTenant

  validates :name, presence: { message: I18n.t('errors.presence') }
  validates :email, presence: { message: I18n.t('errors.presence') },
                    uniqueness: { case_sensitive: false },
                    format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i, message: I18n.t('errors.email.invalid') }
  validates :phone, presence: { message: I18n.t('errors.presence') }
  validates :terms_accepted, acceptance: { message: I18n.t('club.form.error.terms_required') }

  enum status: { approved: 0, expired: 1 }

  before_create :set_default_status

  def self.to_csv
    require 'csv'

    headers = ['Nome', 'Email', 'Telefone', 'Data de Inscrição']
    attributes = %w[name email phone created_at]

    CSV.generate(headers: true) do |csv|
      csv << headers

      all.find_each do |user|
        csv << attributes.map { |attr| attr == 'created_at' ? user[attr].strftime('%d/%m/%Y %H:%M') : user[attr] }
      end
    end
  end

  private

  def set_default_status
    self.status ||= :approved
  end
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
#  index_club_users_on_tenant_email   (tenant_id,email)
#  index_club_users_on_tenant_id      (tenant_id)
#  index_club_users_on_tenant_status  (tenant_id,status)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
