# frozen_string_literal: true

class ClubUser < ApplicationRecord
  validates :name, presence: { message: I18n.t('errors.presence') }
  validates :email, presence: { message: I18n.t('errors.presence') },
                    uniqueness: { case_sensitive: false },
                    format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i, message: I18n.t('errors.email.invalid') }
  validates :phone, presence: { message: I18n.t('errors.presence') }
  validates :terms_accepted, acceptance: { message: I18n.t('club.form.error.terms_required') }

  enum status: { approved: 0, expired: 1 }

  before_create :set_default_status

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
#
