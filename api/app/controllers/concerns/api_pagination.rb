# frozen_string_literal: true

module ApiPagination
  extend ActiveSupport::Concern
  include Pagy::Backend

  def paginate(collection, serializer: nil, serializer_options: {})
    pagy, paginated_collection = pagy(collection, items: params[:per_page] || 25)

    data = if serializer
             ActiveModel::Serializer::CollectionSerializer.new(
               paginated_collection,
               serializer:,
               **serializer_options
             ).as_json
           else
             paginated_collection
           end

    {
      data:,
      pagination: {
        current_page: pagy.page,
        total_pages: pagy.pages,
        total_count: pagy.count,
        per_page: pagy.items
      }
    }
  end
end
