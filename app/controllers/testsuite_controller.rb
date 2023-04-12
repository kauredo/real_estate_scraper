# frozen_string_literal: true

class TestsuiteController < ApplicationController
  def sitemap
    @listings = Listing.all
    @blog_posts = BlogPost.visible
    @listing_complexes = ListingComplex.all
  end
end
