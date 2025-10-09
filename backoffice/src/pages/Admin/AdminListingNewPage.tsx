import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateListing } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import ListingForm, {
  ListingFormData,
} from "../../components/admin/forms/ListingForm";
import { Button } from "../../components/admin/ui";

const AdminListingNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: ListingFormData) => {
    try {
      setLoading(true);
      await adminCreateListing(formData);
      navigate(appRoutes.backoffice.listings);
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t("admin.listings.new")}
            </h1>
          </div>
          <Button
            onClick={() => navigate(appRoutes.backoffice.listings)}
            variant="secondary"
          >
            {t("common.back")}
          </Button>
        </div>

        <ListingForm onSubmit={handleSubmit} isSubmitting={loading} />
      </div>
    </div>
  );
};

export default AdminListingNewPage;
