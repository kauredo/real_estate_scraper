import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  adminGetListingComplexes,
  adminDeleteListingComplex,
} from "../../services/api";
import { ListingComplex } from "../../utils/interfaces";

interface ListingComplexesTableProps {
  onEdit?: (listingComplex: ListingComplex) => void;
  onView?: (listingComplex: ListingComplex) => void;
}

const ListingComplexesTable: React.FC<ListingComplexesTableProps> = ({
  onEdit,
  onView,
}) => {
  const { t } = useTranslation();
  const [listingComplexes, setListingComplexes] = useState<ListingComplex[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 25,
  });

  const fetchListingComplexes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetListingComplexes({ page, per_page: 25 });
      setListingComplexes(response.data.listing_complexes);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(t("admin.listingComplexes.errorLoading"));
      console.error("Error fetching listing complexes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingComplexes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("admin.listingComplexes.confirmDelete"))) {
      return;
    }

    try {
      await adminDeleteListingComplex(id);
      await fetchListingComplexes(pagination.current_page);
    } catch (err) {
      setError(t("admin.listingComplexes.errorDeleting"));
      console.error("Error deleting listing complex:", err);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchListingComplexes(newPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t("admin.listingComplexes.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {t("admin.listingComplexes.title")}
        </h2>
        <div className="text-sm text-gray-600">
          {t("admin.listingComplexes.totalCount", {
            count: pagination.total_count,
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listingComplexes.map(complex => (
          <div
            key={complex.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {complex.main_photo && (
              <div className="h-48 bg-gray-200">
                <img
                  src={complex.main_photo.image?.url}
                  alt={complex.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {complex.name}
                </h3>
                <div className="flex items-center space-x-1">
                  {complex.new_format && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {t("common.new")}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {complex.description}
              </p>

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div>ID: {complex.id}</div>
                <div>Slug: {complex.slug}</div>
                <div>
                  {t("admin.listingComplexes.details.photos")}:{" "}
                  {complex.photos?.length || 0}
                </div>
                <div>
                  {t("admin.listingComplexes.details.listings")}:{" "}
                  {complex.listings?.length || 0}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                {onView && (
                  <button
                    onClick={() => onView(complex)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    {t("common.view")}
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(complex)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    {t("common.edit")}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(complex.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  {t("common.delete")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {listingComplexes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t("admin.listingComplexes.empty")}</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("pagination.next")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingComplexesTable;
