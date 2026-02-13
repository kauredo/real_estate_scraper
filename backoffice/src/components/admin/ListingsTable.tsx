import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  adminGetListings,
  adminDeleteListing,
  generatePreviewToken,
} from "../../services/api";
import { Listing } from "../../utils/interfaces";
import { Button, Pagination, LoadingSpinner, PreviewModal, ConfirmDialog } from "../admin/ui";

interface ListingsTableProps {
  onEdit?: (listing: Listing) => void;
}

const ListingsTable: React.FC<ListingsTableProps> = ({ onEdit }) => {
  const { t } = useTranslation();
  const [listings, setListings] = useState<Listing[]>([]);
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchListings = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetListings({ page, per_page: 25 });
      setListings(response.data.listings);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(t("backoffice.listings.load_error"));
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDeleteClick = (id: number) => {
    setListingToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!listingToDelete) return;

    try {
      setIsDeleting(true);
      await adminDeleteListing(listingToDelete);
      await fetchListings(pagination.current_page);
      setIsDeleteDialogOpen(false);
      setListingToDelete(null);
    } catch (err) {
      setError(t("backoffice.listings.delete_error"));
      console.error("Error deleting listing:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchListings(newPage);
  };

  const handlePreview = async (listing: Listing) => {
    try {
      const response = await generatePreviewToken("listing", listing.id);
      setPreviewUrl(response.data.preview_url);
      setPreviewTitle(`Preview: ${listing.title}`);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(price);
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
        <h2 className="text-2xl font-bold">{t("backoffice.listings.title")}</h2>
        <div className="text-sm text-neutral-600">
          {pagination.total_count} {t("backoffice.listings.total")}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                {t("common.title")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                {t("backoffice.listings.table.price")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                {t("backoffice.listings.table.development")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                {t("common.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {listings.map((listing) => (
              <tr key={listing.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {listing.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">
                    {listing.title}
                  </div>
                  <div className="text-sm text-neutral-500">{listing.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {formatPrice(listing.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      listing.status === "recent"
                        ? "bg-green-100 text-green-800"
                        : listing.status === "sold"
                          ? "bg-red-100 text-red-800"
                          : listing.status === "rented"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {listing.listing_complex_id || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button
                    onClick={() => handlePreview(listing)}
                    variant="link"
                    size="sm"
                    className="text-green-600 hover:text-green-900"
                  >
                    👁️ Preview
                  </Button>
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(listing)}
                      variant="link"
                      size="sm"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {t("common.edit")}
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteClick(listing.id)}
                    variant="link"
                    size="sm"
                    className="text-red-600 hover:text-red-900"
                  >
                    {t("common.delete")}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setListingToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={t("backoffice.listings.delete_title")}
        message={t("backoffice.listings.delete_message")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ListingsTable;
