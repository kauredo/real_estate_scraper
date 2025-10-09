import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { adminGetListing, adminUpdateListing } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import ListingForm, { ListingFormData } from "../../components/admin/forms/ListingForm";
import { Button, LoadingSpinner } from "../../components/admin/ui";

const AdminListingEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState<ListingFormData | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await adminGetListing(parseInt(id));
        if (response.data?.listing) {
          const listingData = response.data.listing;
          setInitialData({
            title: listingData.title || "",
            description: listingData.description || "",
            price: listingData.price?.toString() || "",
            location: listingData.location || "",
            property_type: listingData.property_type || "",
            status: listingData.status || "active",
          });
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleSubmit = async (formData: ListingFormData) => {
    if (!id) return;

    try {
      setSaving(true);
      await adminUpdateListing(parseInt(id), formData);
      navigate(appRoutes.backoffice.listings);
    } catch (error) {
      console.error("Error updating listing:", error);
    } finally {
      setSaving(false);
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
            {t("admin.listings.notFound")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t("admin.listings.edit")}
            </h1>
          </div>
          <Button
            onClick={() => navigate(appRoutes.backoffice.listings)}
            variant="secondary"
          >
            {t("common.back")}
          </Button>
        </div>

        <ListingForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </div>
    </div>
  );
};

export default AdminListingEditPage;
