# frozen_string_literal: true

module ApiPagination
  extend ActiveSupport::Concern
  include Pagy::Backend

  def paginate(collection)
    pagy, paginated_collection = pagy(collection, items: params[:per_page] || 25)

    {
      data: paginated_collection,
      pagination: {
        current_page: pagy.page,
        total_pages: pagy.pages,
        total_count: pagy.count,
        per_page: pagy.items
      }
    }
  end
end
