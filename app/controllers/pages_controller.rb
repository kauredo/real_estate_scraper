class PagesController < ApplicationController
  def home
    @listings = Listing.all
    # render component: 'Home', props: { listings: @listings }, tag: 'span', class: 'todo'
  end
end
