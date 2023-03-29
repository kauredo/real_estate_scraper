class BlogPost < ApplicationRecord
  extend Mobility
  translates :title, :text
  has_many :blog_photos, dependent: :destroy
end
