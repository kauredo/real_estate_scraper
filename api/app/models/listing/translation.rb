# frozen_string_literal: true

class Listing
  class Translation < ApplicationRecord
    belongs_to :listing

    acts_as_paranoid

    default_scope { unscope(where: :deleted_at) }

    # def destroy
    #   if deleted_at.nil?
    #     update(deleted_at: Time.zone.now)
    #     true
    #   else
    #     destroy_fully!
    #   end
    # end

    # def recover
    #   update(deleted_at: nil)
    #   true
    # end
  end
end

# == Schema Information
#
# Table name: listing_translations
#
#  id          :bigint           not null, primary key
#  deleted_at  :datetime
#  description :text
#  features    :string           default([]), is an Array
#  locale      :string           not null
#  slug        :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  listing_id  :bigint           not null
#
# Indexes
#
#  index_listing_translations_on_listing_id_and_locale  (listing_id,locale) UNIQUE
#  index_listing_translations_on_locale                 (locale)
#
# Foreign Keys
#
#  fk_rails_...  (listing_id => listings.id)
#
