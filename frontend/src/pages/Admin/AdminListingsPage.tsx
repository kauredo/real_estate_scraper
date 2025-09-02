import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Listing } from "../../utils/interfaces";
import { adminGetListings, adminUpdateAllListings } from "../../services/api";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
  from: number;
  to: number;
}

const AdminListingsPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current_page: 1,
    per_page: 25,
    total_count: 0,
    total_pages: 0,
    from: 1,
    to: 25,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const order = searchParams.get("order") || "order";

  const fetchListings = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        order,
        per_page: 25,
      };

      const response = await adminGetListings(params);
      setListings(response.data.listings);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderChange = (newOrder: string) => {
    setSearchParams({ order: newOrder });
  };

  const handleUpdateAll = async () => {
    if (!window.confirm(t("admin.listings.confirmUpdateAll"))) {
      return;
    }

    try {
      setUpdating(true);
      await adminUpdateAllListings();
      await fetchListings(); // Refresh after update
    } catch (error) {
      console.error("Error updating listings:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchListings(page);
  };

  useEffect(() => {
    fetchListings();
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap mb-6">
        <button
          onClick={handleUpdateAll}
          disabled={updating}
          className="cursor-pointer bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {updating
            ? t("admin.listings.updating")
            : t("admin.listings.updateAll")}
        </button>

        <select
          value={order}
          onChange={e => handleOrderChange(e.target.value)}
          className="block w-full sm:w-auto p-2 border rounded focus:border-blue-500 dark:bg-beige-medium"
        >
          <option value="order">{t("admin.listings.order.normal")}</option>
          <option value="recent">{t("admin.listings.order.recent")}</option>
          <option value="deleted">{t("admin.listings.order.deleted")}</option>
          <option value="deleted_only">
            {t("admin.listings.order.deletedOnly")}
          </option>
        </select>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl">
        {t("admin.listings.title")}
      </h2>
      <p className="text-center text-gray-600 max-w-none">
        {t("admin.listings.itemsRange", {
          from: pagination.from,
          to: pagination.to,
          total: pagination.total_count,
        })}
      </p>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center items-center space-x-2 my-6">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            {t("pagination.previous")}
          </button>

          <span className="px-3 py-1">
            {t("pagination.page", {
              current: pagination.current_page,
              total: pagination.total_pages,
            })}
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            {t("pagination.next")}
          </button>
        </div>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {listings.map(listing => (
          <div
            key={listing.id}
            className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg"
          >
            {/* Image */}
            <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
              {listing.photos && listing.photos.length > 0 ? (
                <img
                  src={listing.photos[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">
                    {t("admin.listings.noPhoto")}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h5 className="text-gray-900 dark:text-light font-bold text-lg mb-2 line-clamp-2">
                {listing.title}
              </h5>

              <p className="text-gray-700 dark:text-light text-sm mb-2">
                {listing.address}
              </p>

              <p className="text-gray-900 dark:text-light font-bold text-lg mb-3">
                €{listing.price}
              </p>

              {/* Stats */}
              {listing.stats && (
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-light mb-3">
                  <span>🛏️ {listing.stats.bedrooms}</span>
                  <span>🚿 {listing.stats.bathrooms}</span>
                  <span>🚗 {listing.stats.parking}</span>
                  <span>📐 {listing.stats.area}m²</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <a
                  href={`/backoffice/listings/${listing.id}`}
                  className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-1 px-3 rounded text-sm"
                >
                  {t("common.view")}
                </a>
                <a
                  href={`/backoffice/listings/${listing.id}/edit`}
                  className="bg-blue-500 hover:bg-blue-700 text-white dark:text-dark font-bold py-1 px-3 rounded text-sm"
                >
                  {t("common.edit")}
                </a>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    listing.status === "sold"
                      ? "bg-red-100 text-red-800"
                      : listing.status === "rented"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {listing.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            {t("pagination.previous")}
          </button>

          <span className="px-3 py-1">
            {t("pagination.page", {
              current: pagination.current_page,
              total: pagination.total_pages,
            })}
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            {t("pagination.next")}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminListingsPage;
