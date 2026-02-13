import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ListingComplex } from "../../utils/interfaces";
import { appRoutes } from "../../utils/routes";
import {
  adminGetListingComplexes,
  generatePreviewToken,
  adminDeleteListingComplex,
} from "../../services/api";
import {
  LoadingSpinner,
  Button,
  Pagination,
  PreviewModal,
  Modal,
  AdminCard,
} from "../../components/admin/ui";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

const AdminListingComplexesPage = () => {
  const { t } = useTranslation();
  const [listingComplexes, setListingComplexes] = useState<ListingComplex[]>(
    [],
  );
  const [pagination, setPagination] = useState<PaginationState>({
    current_page: 1,
    per_page: 25,
    total_count: 0,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [complexToDelete, setComplexToDelete] = useState<ListingComplex | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchListingComplexes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetListingComplexes({ page });
      setListingComplexes(response.data.listing_complexes);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching listing complexes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchListingComplexes(page);
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

  const handleDeleteClick = (complex: ListingComplex) => {
    setComplexToDelete(complex);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!complexToDelete) return;

    try {
      setIsDeleting(true);
      await adminDeleteListingComplex(complexToDelete.id);

      // Update local state to remove the deleted item immediately
      setListingComplexes((prev) =>
        prev.filter((item) => item.id !== complexToDelete.id),
      );
      setPagination((prev) => ({
        ...prev,
        total_count: prev.total_count - 1,
      }));

      setIsDeleteModalOpen(false);
      setComplexToDelete(null);
    } catch (error) {
      console.error("Error deleting listing complex:", error);
      // Here you might want to show an error notification
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchListingComplexes();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-dark dark:text-light sm:text-3xl">
            {t("backoffice.listing_complexes.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Total {pagination.total_count} {t("backoffice.listing_complexes.total")}
          </p>
        </div>

        <Link to="/listing_complexes/new">
          <Button variant="primary">+ {t("backoffice.listing_complexes.new")}</Button>
        </Link>
      </div>

      {/* Pagination Top */}
      {pagination.total_pages > 1 && (
        <div className="mb-6">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Listing Complexes Grid (using AdminCard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {listingComplexes.map((complex) => (
          <AdminCard
            key={complex.id}
            title={complex.name}
            subtitle={
              complex.description ||
              complex.subtext ||
              t("backoffice.listing_complexes.no_description")
            }
            image={
              complex.main_photo_thumb ||
              complex.main_photo_medium ||
              complex.main_photo?.image?.url ||
              complex.main_photo?.image_url
            }
            imagePlaceholder={<span className="text-4xl">🏢</span>}
            status={
              complex.hidden
                ? {
                    label: t("admin.listingComplexes.hidden"),
                    variant: "warning",
                  }
                : complex.new_format
                  ? {
                      label: t("admin.listingComplexes.newFormat"),
                      variant: "success",
                    }
                  : undefined
            }
            actions={
              <>
                <button
                  onClick={() => handlePreview(complex)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-xs font-medium"
                >
                  👁️ Preview
                </button>
                <Link
                  to={appRoutes.backoffice.editListingComplex(complex.id)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium"
                >
                  {t("common.edit")}
                </Link>
                <button
                  onClick={() => handleDeleteClick(complex)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-xs font-medium"
                  title={t("common.delete")}
                >
                  🗑️ {t("common.delete")}
                </button>
              </>
            }
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mb-2 mt-2">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-medium tracking-wider">
                  {t("backoffice.listing_complexes.photos")}
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {complex.photos?.length || 0}
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-medium tracking-wider">
                  {t("backoffice.listing_complexes.listings")}
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {complex.listings_count || 0}
                </span>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Pagination Bottom */}
      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
        className="mt-8"
      />

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t("backoffice.listing_complexes.delete_title")}
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              {t("common.cancel")}
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={isDeleting}
            >
              {t("common.delete")}
            </Button>
          </>
        }
      >
        <div className="text-gray-600 dark:text-gray-300">
          <p>
            {t("backoffice.listing_complexes.delete_message")}{" "}
            <strong>{complexToDelete?.name}</strong>?
          </p>
          <p className="text-sm mt-2 text-red-500">{t("backoffice.listing_complexes.delete_irreversible")}</p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminListingComplexesPage;
