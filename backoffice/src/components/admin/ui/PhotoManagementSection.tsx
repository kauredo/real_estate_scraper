/* eslint-disable no-restricted-syntax, i18next/no-literal-string */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import ConfirmDialog from "./ConfirmDialog";

interface Photo {
  id: number;
  image: { url: string };
  image_url?: string;
  main: boolean;
}

interface PhotoManagementSectionProps {
  photos?: Photo[];
  newPhotos?: File[];
  onSetMain?: (photoId: number) => void;
  onDelete?: (photoId: number) => Promise<void>;
  onUpload?: (files: File[]) => void;
  onRemoveNewPhoto?: (index: number) => void;
  showUpload?: boolean;
  mode?: "edit" | "create";
}

const PhotoManagementSection = ({
  photos = [],
  newPhotos = [],
  onSetMain,
  onDelete,
  onUpload,
  onRemoveNewPhoto,
  showUpload = true,
}: PhotoManagementSectionProps) => {
  const { t } = useTranslation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      if (onUpload) {
        onUpload(acceptedFiles);
      }
    },
  });

  const handleDeleteClick = (photoId: number) => {
    setPhotoToDelete(photoId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!photoToDelete || !onDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(photoToDelete);
      setIsDeleteDialogOpen(false);
      setPhotoToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSetMain = (photoId: number) => {
    if (onSetMain) {
      onSetMain(photoId);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-6 space-y-6">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pb-5">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          {t("admin.common.media_section")}
        </h2>
      </div>

      {/* Existing Photos */}
      {photos.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            {t("admin.common.existing_photos")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group border rounded-lg overflow-hidden"
              >
                <img
                  src={photo.image?.url || photo.image_url || ""}
                  alt="Photo"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleSetMain(photo.id)}
                    className={`px-3 py-1 text-xs rounded ${
                      photo.main
                        ? "bg-green-500 text-white"
                        : "bg-white text-neutral-700"
                    }`}
                  >
                    {photo.main
                      ? t("admin.common.main_photo")
                      : t("admin.common.set_main")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(photo.id)}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    {t("common.delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload New Photos */}
      {showUpload && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t("admin.common.add_photos")}
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-neutral-300 dark:border-neutral-600 hover:border-neutral-400"
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-neutral-600 dark:text-neutral-400">
              {isDragActive
                ? t("admin.common.drop_images_here")
                : t("admin.common.dropzone")}
            </p>
          </div>

          {newPhotos.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                {t("admin.common.new_photos", { count: newPhotos.length })}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {newPhotos.map((file, index) => (
                  <div
                    key={index}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Nova foto ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onRemoveNewPhoto && onRemoveNewPhoto(index)
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setPhotoToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={t("admin.common.delete_photo_title")}
        message={t("admin.common.delete_photo_confirm")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default PhotoManagementSection;
