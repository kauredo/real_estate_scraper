import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  adminGetListingComplexes,
  adminDeleteListingComplex,
  generatePreviewToken,
} from "../../services/api";
import { ListingComplex } from "../../utils/interfaces";
import { Button, Pagination, LoadingSpinner, PreviewModal } from "../admin/ui";

interface ListingComplexesTableProps {
  onEdit?: (listingComplex: ListingComplex) => void;
}

const ListingComplexesTable: React.FC<ListingComplexesTableProps> = ({
  onEdit,
}) => {
  const { t } = useTranslation();
  const [listingComplexes, setListingComplexes] = useState<ListingComplex[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 25,
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");

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

  const handlePreview = async (complex: ListingComplex) => {
    try {
      const response = await generatePreviewToken(
        "listing_complex",
        complex.id,
      );
      setPreviewUrl(response.data.preview_url);
      setPreviewTitle(`Preview: ${complex.name}`);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
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
        {listingComplexes.map((complex) => (
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
                <Button
                  onClick={() => handlePreview(complex)}
                  variant="link"
                  size="sm"
                  className="text-green-600 hover:text-green-900"
                >
                  👁️ Preview
                </Button>
                {onEdit && (
                  <Button
                    onClick={() => onEdit(complex)}
                    variant="link"
                    size="sm"
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {t("common.edit")}
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(complex.id)}
                  variant="link"
                  size="sm"
                  className="text-red-600 hover:text-red-900"
                >
                  {t("common.delete")}
                </Button>
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
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />
    </div>
  );
};

export default ListingComplexesTable;
