import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetListingComplex,
  adminUpdateListingComplex,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import ListingComplexForm, {
  ListingComplexFormData,
} from "../../components/admin/forms/ListingComplexForm";
import { Button, LoadingSpinner } from "../../components/admin/ui";

const AdminListingComplexEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState<ListingComplexFormData | null>(
    null,
  );

  useEffect(() => {
    const fetchListingComplex = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await adminGetListingComplex(parseInt(id));
        if (response.data?.listing_complex) {
          const complexData = response.data.listing_complex;
          setInitialData({
            name: complexData.name || "",
            description: complexData.description || "",
            subtext: complexData.subtext || "",
            final_text: complexData.final_text || "",
            location: complexData.location || "",
            price_from: complexData.price_from?.toString() || "",
            video_link: complexData.video_link || "",
          });
        }
      } catch (error) {
        console.error("Error fetching listing complex:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingComplex();
  }, [id]);

  const handleSubmit = async (formData: ListingComplexFormData) => {
    if (!id) return;

    try {
      setSaving(true);
      const submitData = {
        ...formData,
        price_from: formData.price_from ? parseFloat(formData.price_from) : 0,
      };
      await adminUpdateListingComplex(parseInt(id), submitData);
      navigate(appRoutes.backoffice.listingComplexes);
    } catch (error) {
      console.error("Error updating listing complex:", error);
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
            {t("admin.listingComplexes.notFound")}
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
              {t("admin.listingComplexes.edit")}
            </h1>
          </div>
          <Button
            onClick={() => navigate(appRoutes.backoffice.listingComplexes)}
            variant="secondary"
          >
            {t("common.back")}
          </Button>
        </div>

        <ListingComplexForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </div>
    </div>
  );
};

export default AdminListingComplexEditPage;
