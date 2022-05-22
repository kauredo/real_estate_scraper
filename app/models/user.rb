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
  validates :first_name, presence: { message: "não pode estar vazio" }
  validates :last_name, presence: { message: "não pode estar vazio" }

  scope :for_newsletter, -> { where(confirmed_email: true) }

  has_one :newsletter_subscription, dependent: :destroy

  def name=(name)
    names = name.split
    self.first_name = names.first
    last_names = names.drop(1)
    self.last_name = last_names.join(' ') if last_names
    self.save
  end

  def name
    first_name + " " + last_name
  end
end
