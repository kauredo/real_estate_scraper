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
            Empreendimentos
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Total {pagination.total_count} empreendimentos encontrados
          </p>
        </div>

        <Link to="/listing_complexes/new">
          <Button variant="primary">+ Novo Empreendimento</Button>
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

      {/* Listing Complexes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {listingComplexes.map((complex) => (
          <div
            key={complex.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
          >
            {/* Image Overlay Header */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {complex.main_photo_thumb ||
              complex.main_photo_medium ||
              complex.main_photo?.image?.url ||
              complex.main_photo?.image_url ? (
                <img
                  src={
                    complex.main_photo_thumb ||
                    complex.main_photo_medium ||
                    complex.main_photo?.image?.url ||
                    complex.main_photo?.image_url
                  }
                  alt={complex.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-4xl">🏢</span>
                </div>
              )}

              {/* Overlay Badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                {complex.hidden && (
                  <span className="px-2 py-1 text-xs font-semibold bg-yellow-500/90 text-white rounded-md backdrop-blur-sm shadow-sm">
                    {t("admin.listingComplexes.hidden")}
                  </span>
                )}
                {complex.new_format && (
                  <span className="px-2 py-1 text-xs font-semibold bg-green-500/90 text-white rounded-md backdrop-blur-sm shadow-sm">
                    {t("admin.listingComplexes.newFormat")}
                  </span>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {complex.name}
                </h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {complex.description ||
                  complex.subtext ||
                  "Sem descrição disponível."}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mb-6 mt-auto">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                  <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-medium tracking-wider">
                    Fotos
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {complex.photos?.length || 0}
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center">
                  <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-medium tracking-wider">
                    Imóveis
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {complex.listings_count || 0}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => handlePreview(complex)}
                  className="flex-1 text-xs font-medium px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center gap-1"
                >
                  <span>👁️</span> Preview
                </button>

                <Link
                  to={appRoutes.backoffice.editListingComplex(complex.id)}
                  className="flex-1 text-center"
                >
                  <button className="w-full text-xs font-medium px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 transition-colors">
                    {t("common.edit")}
                  </button>
                </Link>

                <button
                  onClick={() => handleDeleteClick(complex)}
                  className="flex-none p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  title={t("common.delete")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
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
        title="Apagar Empreendimento"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={isDeleting}
            >
              Apagar
            </Button>
          </>
        }
      >
        <div className="text-gray-600 dark:text-gray-300">
          <p>
            Tem a certeza que deseja apagar o empreendimento{" "}
            <strong>{complexToDelete?.name}</strong>?
          </p>
          <p className="text-sm mt-2 text-red-500">Esta ação é irreversível.</p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminListingComplexesPage;
