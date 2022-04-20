class PagesController < ApplicationController
  def home
    @listings = Listing.by_city
    @results = {
      listingCount: Listing.all.count,
      variables: Variable.all
    }
    # render component: 'Home', props: { listings: @listings }, tag: 'span', class: 'todo'
  end

  def about
    @results = {
      listingCount: Listing.all.count,
      volume: Variable.volume
    }
  end

  def services
  end

  def house_360
  end

  def contact
  end
end
