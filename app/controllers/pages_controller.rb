class PagesController < ApplicationController
  def home
    @listings = Listing.all
    # render component: 'Home', props: { listings: @listings }, tag: 'span', class: 'todo'
  end

  def about
  end

  def calculator
  end

  def services
  end

  def house_360
  end

  def contact
  end
end
