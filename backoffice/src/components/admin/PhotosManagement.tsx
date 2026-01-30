import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { adminGetPhotos, adminDeletePhoto } from "../../services/api";
import { Photo } from "../../utils/interfaces";
import { Button, Pagination, LoadingSpinner, ConfirmDialog } from "../admin/ui";

const PhotosManagement: React.FC = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 25,
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPhotos = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetPhotos({ page, per_page: 25 });
      setPhotos(response.data.photos);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(t("admin.photos.errorLoading"));
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDeleteClick = (id: number) => {
    setPhotoToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!photoToDelete) return;

    try {
      setIsDeleting(true);
      await adminDeletePhoto(photoToDelete);
      await fetchPhotos(pagination.current_page);
      setIsDeleteDialogOpen(false);
      setPhotoToDelete(null);
    } catch (err) {
      setError(t("admin.photos.errorDeleting"));
      console.error("Error deleting photo:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchPhotos(newPage);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("admin.photos.title")}</h2>
        <div className="text-sm text-neutral-600">
          {t("admin.photos.totalCount", { count: pagination.total_count })}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-neutral-200">
              <img
                src={photo.image.url}
                alt={`Photo ${photo.id}`}
                className="h-48 w-full object-cover object-center group-hover:opacity-75"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    ID: {photo.id}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {t("admin.photos.order")}: {photo.order}
                  </p>
                </div>
                {photo.main && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t("admin.photos.main")}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <p className="text-xs text-neutral-600">
                  {t("admin.photos.listingComplexId")}:{" "}
                  {photo.listing_complex_id}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleDeleteClick(photo.id)}
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

      {photos.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-neutral-500">{t("admin.photos.empty")}</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setPhotoToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={t("admin.photos.deleteTitle")}
        message={t("admin.photos.confirmDelete")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default PhotosManagement;
