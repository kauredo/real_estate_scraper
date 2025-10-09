import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListingComplex } from "../../utils/interfaces";
import {
  adminGetListingComplexes,
  generatePreviewToken,
} from "../../services/api";
import {
  LoadingSpinner,
  Button,
  Pagination,
  PreviewModal,
} from "../../components/admin/ui";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

const AdminListingComplexesPage = () => {
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
        <Button as={Link} to="/listing_complexes/new">
          Novo Empreendimento
        </Button>
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
          <div
            key={complex.id}
            className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-48 bg-gray-200 overflow-hidden">
              {complex.main_photo ? (
                <img
                  src={
                    complex.main_photo.image?.url ||
                    complex.main_photo.image_url
                  }
                  alt={complex.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Sem foto</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h5 className="text-gray-900 dark:text-light font-bold text-lg mb-2 line-clamp-2">
                {complex.name}
              </h5>

              <p className="text-gray-700 dark:text-light text-sm mb-3 line-clamp-3">
                {complex.description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-light mb-3">
                <span>📷 {complex.photos?.length || 0} fotos</span>
                <span>
                  🏠 {complex.listing_prices?.[1]?.length || 0} imóveis
                </span>
                {complex.new_format && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    Novo formato
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handlePreview(complex)} size="sm">
                  👁️ Preview
                </Button>
                <Button
                  as="a"
                  href={`/listing_complexes/${complex.id}/edit`}
                  variant="secondary"
                  size="sm"
                >
                  Editar
                </Button>
              </div>
            </div>
          </div>
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
