# frozen_string_literal: true

class EmailValidator < ActiveModel::EachValidator
  EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i

  def validate_each(record, attribute, value)
    return if value&.match(EMAIL_REGEX)

    record.errors.add attribute, (options[:message] || I18n.t('errors.email.invalid'))
  end
end

class User < ApplicationRecord
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
