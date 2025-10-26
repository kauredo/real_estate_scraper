# frozen_string_literal: true

class EmailValidator < ActiveModel::EachValidator
  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  def validate_each(record, attribute, value)
    return if value&.match(EMAIL_REGEX)

    record.errors.add attribute, (options[:message] || I18n.t('errors.email.invalid'))
  end
end

class User < ApplicationRecord
  include ActsAsTenant
  validates :email, presence: { message: I18n.t('errors.presence') }, uniqueness: { case_sensitive: false }, email: true
  validates :first_name, presence: { message: I18n.t('errors.presence') }
  validates :last_name, presence: { message: I18n.t('errors.presence') }

  scope :for_newsletter, -> { where(confirmed_email: true) }

  has_one :newsletter_subscription, dependent: :destroy

  def name=(name)
    names = name.split
    self.first_name = names.first
    last_names = names.drop(1)
    self.last_name = last_names.join(' ') if last_names
    save
  end

  def name
    "#{first_name} #{last_name}"
  end
end

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  confirmed_email :boolean
#  email           :string
#  first_name      :string
#  last_name       :string
#  phone           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  tenant_id       :bigint
#
# Indexes
#
#  index_users_on_tenant_id  (tenant_id)
#
# Foreign Keys
#
#  fk_rails_...  (tenant_id => tenants.id)
#
