class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors.add attribute, (options[:message] || "não é um email válido")
    end
  end
end

class User < ApplicationRecord
  # validates :first_name, presence: { message: "não pode estar vazio" }
  # validates :last_name, presence: { message: "não pode estar vazio" }
  validates :email, presence: { message: "não pode estar vazio" }, uniqueness: { case_sensitive: false }, email: true

  scope :for_newsletter, -> { where(confirmed_email: true) }

  has_one :newsletter_subscription
end
