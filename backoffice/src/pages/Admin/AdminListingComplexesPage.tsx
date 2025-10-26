import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ListingComplex } from "../../utils/interfaces";
import { appRoutes } from "../../utils/routes";
import {
  adminGetListingComplexes,
  generatePreviewToken,
} from "../../services/api";
import {
  LoadingSpinner,
  Button,
  Pagination,
  PreviewModal,
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

  useEffect(() => {
    fetchListingComplexes();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      {/* Header */}
      <div className="mb-6">
        <Link to="/listing_complexes/new">
          <Button>
            Novo Empreendimento
          </Button>
        </Link>
      </div>

      <h2 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto">
        Empreendimentos
      </h2>
      <p className="text-center text-gray-600 max-w-none">
        Total {pagination.total_count} empreendimentos
      </p>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
        className="my-6"
      />

      {/* Listing Complexes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {listingComplexes.map((complex) => (
          <AdminCard
            key={complex.id}
            title={complex.name}
            subtitle={complex.description}
            image={
              complex.main_photo?.image?.url ||
              complex.main_photo?.image_url
            }
            status={
              complex.hidden
                ? { label: t("admin.listingComplexes.hidden"), variant: "warning" }
                : complex.new_format
                  ? { label: t("admin.listingComplexes.newFormat"), variant: "success" }
                  : undefined
            }
            actions={
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePreview(complex)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  👁️ Preview
                </button>
                <Link
                  to={appRoutes.backoffice.editListingComplex(complex.id)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("common.edit")}
                </Link>
              </div>
            }
          >
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 mt-2">
              <span>📷 {complex.photos?.length || 0} fotos</span>
              <span>🏠 {complex.listings_count || 0} imóveis</span>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Bottom Pagination */}
      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
        className="mt-6"
      />

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />
    </div>
  );
};

export default AdminListingComplexesPage;
