import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetListingComplex,
  adminUpdateListingComplex,
  adminGetListings,
  adminUploadListingComplexPhotos,
  adminDeleteListingComplexPhoto,
  adminUpdateListingComplexPhotos,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import ListingComplexForm, {
  ListingComplexFormData,
} from "../../components/admin/forms/ListingComplexForm";
import {
  Button,
  LoadingSpinner,
  MultiSelectOption,
} from "../../components/admin/ui";
import PreviewButton from "../../components/admin/PreviewButton";
import Flashes from "../../components/shared/Flashes";

interface FlashMessage {
  type: string;
  message: string;
}

const AdminListingComplexEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [initialData, setInitialData] = useState<ListingComplexFormData | null>(
    null,
  );
  const [availableListings, setAvailableListings] = useState<
    MultiSelectOption[]
  >([]);
  const [photos, setPhotos] = useState<
    Array<{ id: number; image: { url: string }; main: boolean }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // Fetch listing complex
        const complexResponse = await adminGetListingComplex(parseInt(id));
        if (complexResponse.data?.listing_complex) {
          const complexData = complexResponse.data.listing_complex;
          setInitialData({
            name: complexData.name || "",
            description: complexData.description || "",
            subtext: complexData.subtext || "",
            final_text: complexData.final_text || "",
            video_link: complexData.video_link || "",
            hidden: complexData.hidden || false,
            new_format: complexData.new_format || false,
            order: complexData.order?.toString() || "",
            listing_ids:
              complexData.listings?.map((l: { id: number }) => l.id) || [],
          });
          setPhotos(complexData.photos || []);
        }

        // Fetch all available listings for the multi-select
        const listingsResponse = await adminGetListings({ per_page: 1000 });
        if (listingsResponse.data?.listings) {
          const listingOptions = listingsResponse.data.listings.map(
            (listing: { id: number; title?: string }) => ({
              value: listing.id,
              label: listing.title || `Listing #${listing.id}`,
            }),
          );
          setAvailableListings(listingOptions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFlash({
          type: "error",
          message: t("admin.listingComplexes.errorLoading"),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, t]);

  const handleSubmit = async (formData: ListingComplexFormData) => {
    if (!id) return;

    try {
      setSaving(true);
      setFlash(null);

      const submitData = {
        ...formData,
        order: formData.order ? parseInt(formData.order) : null,
      };

      await adminUpdateListingComplex(parseInt(id), submitData);

      setFlash({
        type: "success",
        message: t("admin.listingComplexes.update_success"),
      });

      // Optionally navigate after a delay
      setTimeout(() => {
        navigate(appRoutes.backoffice.listingComplexes);
      }, 1500);
    } catch (error) {
      console.error("Error updating listing complex:", error);
      setFlash({
        type: "error",
        message: t("admin.listingComplexes.update_error"),
      });
    } finally {
      setSaving(false);
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  const handleSetMainPhoto = async (photoId: number) => {
    try {
      const photosUpdate = photos.reduce(
        (acc: Record<number, { main: boolean }>, photo: { id: number }) => {
          acc[photo.id] = { main: photo.id === photoId };
          return acc;
        },
        {},
      );

      await adminUpdateListingComplexPhotos(parseInt(id!), {
        photos_update: photosUpdate,
      });

      setPhotos((prev) => prev.map((p) => ({ ...p, main: p.id === photoId })));

      setFlash({
        type: "success",
        message: t("admin.listingComplexes.photos.main_success"),
      });
    } catch (error) {
      console.error("Error setting main photo:", error);
      setFlash({
        type: "error",
        message: t("admin.listingComplexes.photos.main_error"),
      });
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    try {
      await adminDeleteListingComplexPhoto(photoId);
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      setFlash({
        type: "success",
        message: t("admin.listingComplexes.photos.delete_success"),
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
      setFlash({
        type: "error",
        message: t("admin.listingComplexes.photos.delete_error"),
      });
    }
  };

  const handleUploadPhotos = async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("photos[]", file);
      });

      await adminUploadListingComplexPhotos(parseInt(id!), formData);

      // Refresh photos
      const complexResponse = await adminGetListingComplex(parseInt(id!));
      if (complexResponse.data?.listing_complex) {
        setPhotos(complexResponse.data.listing_complex.photos || []);
      }

      setFlash({
        type: "success",
        message: t("admin.listingComplexes.photos.add_success"),
      });
    } catch (error) {
      console.error("Error uploading photos:", error);
      setFlash({
        type: "error",
        message: t("admin.listingComplexes.photos.add_error"),
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400">
            {t("admin.listingComplexes.notFound")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Flash Messages */}
      {flash && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t("admin.listingComplexes.edit")}
            </h1>
          </div>
          <div className="flex gap-2">
            <PreviewButton
              contentType="listing_complex"
              contentId={parseInt(id!)}
            />
            <Button
              onClick={() => navigate(appRoutes.backoffice.listingComplexes)}
              variant="secondary"
            >
              {t("common.back")}
            </Button>
          </div>
        </div>

        <ListingComplexForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={saving}
          availableListings={availableListings}
          photos={photos}
          onSetMainPhoto={handleSetMainPhoto}
          onDeletePhoto={handleDeletePhoto}
          onUploadPhotos={handleUploadPhotos}
          showPhotoManagement={true}
        />
      </div>
    </div>
  );
};

export default AdminListingComplexEditPage;
