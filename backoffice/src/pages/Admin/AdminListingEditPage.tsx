import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetListing,
  adminUpdateListing,
  adminGetListingComplexes,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import ListingForm, {
  ListingFormData,
} from "../../components/admin/forms/ListingForm";
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

// Enum mappings to convert API string values to numeric indices
const STATUS_MAP: Record<string, string> = {
  recent: "0",
  standard: "1",
  agreed: "2",
  sold: "3",
  rented: "4",
  closed: "5",
};

const KIND_MAP: Record<string, string> = {
  other: "0",
  apartment: "1",
  house: "2",
  land: "3",
  office: "4",
  garage: "5",
  parking: "6",
  store: "7",
  storage: "8",
  warehouse: "9",
};

const OBJECTIVE_MAP: Record<string, string> = {
  other: "0",
  sale: "1",
  rent: "2",
};

const AdminListingEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [initialData, setInitialData] = useState<ListingFormData | null>(null);
  const [availableListingComplexes, setAvailableListingComplexes] = useState<
    MultiSelectOption[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // Fetch listing
        const listingResponse = await adminGetListing(parseInt(id));
        if (listingResponse.data?.listing) {
          const listingData = listingResponse.data.listing;

          // Convert enum string values to numeric indices
          const statusValue =
            typeof listingData.status === "string"
              ? STATUS_MAP[listingData.status] || "0"
              : listingData.status?.toString() || "0";

          const kindValue =
            typeof listingData.kind === "string"
              ? KIND_MAP[listingData.kind] || "0"
              : listingData.kind?.toString() || "0";

          const objectiveValue =
            typeof listingData.objective === "string"
              ? OBJECTIVE_MAP[listingData.objective] || "0"
              : listingData.objective?.toString() || "0";

          // Ensure features is an array (it might come as a string or array)
          let featuresArray: string[] = [];
          if (Array.isArray(listingData.features)) {
            featuresArray = listingData.features;
          } else if (typeof listingData.features === "string") {
            try {
              featuresArray = JSON.parse(listingData.features);
            } catch {
              featuresArray = [];
            }
          }

          setInitialData({
            title: listingData.title || "",
            description: listingData.description || "",
            address: listingData.address || "",
            price_cents: listingData.price_cents?.toString() || "",
            features: featuresArray,
            status: statusValue,
            kind: kindValue,
            objective: objectiveValue,
            order: listingData.order?.toString() || "",
            video_link: listingData.video_link || "",
            virtual_tour_url: listingData.virtual_tour_url || "",
            listing_complex_id:
              listingData.listing_complex_id?.toString() || "",
            url: listingData.url || undefined,
          });
        }

        // Fetch all available listing complexes for the select
        const complexesResponse = await adminGetListingComplexes({
          per_page: 1000,
        });
        if (complexesResponse.data?.listing_complexes) {
          const complexOptions = complexesResponse.data.listing_complexes.map(
            (complex: any) => ({
              value: complex.id,
              label: complex.name || `Complex #${complex.id}`,
            }),
          );
          setAvailableListingComplexes(complexOptions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFlash({
          type: "error",
          message: t("admin.listings.errorLoading"),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, t]);

  const handleSubmit = async (formData: ListingFormData) => {
    if (!id) return;

    try {
      setSaving(true);
      setFlash(null);

      // Parse integers safely, ensuring we never send NaN
      const parseIntSafe = (value: string, fallback: number) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? fallback : parsed;
      };

      const submitData = {
        ...formData,
        price_cents: formData.price_cents
          ? parseInt(formData.price_cents)
          : null,
        order: formData.order ? parseInt(formData.order) : null,
        status: parseIntSafe(formData.status, 0),
        kind: parseIntSafe(formData.kind, 0),
        objective: parseIntSafe(formData.objective, 0),
        listing_complex_id: formData.listing_complex_id
          ? parseInt(formData.listing_complex_id)
          : null,
      };

      await adminUpdateListing(parseInt(id), submitData);

      setFlash({
        type: "success",
        message: t("admin.listings.update_success"),
      });

      // Optionally navigate after a delay
      setTimeout(() => {
        navigate(appRoutes.backoffice.listings);
      }, 1500);
    } catch (error) {
      console.error("Error updating listing:", error);
      setFlash({
        type: "error",
        message: t("admin.listings.update_error"),
      });
    } finally {
      setSaving(false);
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400">
            {t("admin.listings.notFound")}
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
              {t("admin.listings.edit")}
            </h1>
          </div>
          <div className="flex gap-2">
            <PreviewButton contentType="listing" contentId={parseInt(id!)} />
            <Button
              onClick={() => navigate(appRoutes.backoffice.listings)}
              variant="secondary"
            >
              {t("common.back")}
            </Button>
          </div>
        </div>

        <ListingForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={saving}
          availableListingComplexes={availableListingComplexes}
        />
      </div>
    </div>
  );
};

export default AdminListingEditPage;
