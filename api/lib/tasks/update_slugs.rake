# frozen_string_literal: true

desc 'Update slugs to use friendly_id'
task update_slugs: :environment do
  ActiveRecord::Base.connection_pool.release_connection
  ActiveRecord::Base.connection_pool.with_connection do
    I18n.with_locale(:pt) do
      BlogPost.find_each(&:save)
      Listing.find_each(&:save)
      ListingComplex.find_each(&:save)
    end
    I18n.with_locale(:en) do
      BlogPost.find_each(&:save)
      Listing.find_each(&:save)
      ListingComplex.find_each(&:save)
    end
  end
end
