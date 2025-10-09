import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateListingComplex } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import ListingComplexForm, {
  ListingComplexFormData,
} from "../../components/admin/forms/ListingComplexForm";
import { Button } from "../../components/admin/ui";

const AdminListingComplexNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: ListingComplexFormData) => {
    try {
      setLoading(true);
      const submitData = {
        ...formData,
        price_from: formData.price_from ? parseFloat(formData.price_from) : 0,
      };
      await adminCreateListingComplex(submitData);
      navigate(appRoutes.backoffice.listingComplexes);
    } catch (error) {
      console.error("Error creating listing complex:", error);
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
              {t("admin.listingComplexes.new")}
            </h1>
          </div>
          <Button
            onClick={() => navigate(appRoutes.backoffice.listingComplexes)}
            variant="secondary"
          >
            {t("common.back")}
          </Button>
        </div>

        <ListingComplexForm onSubmit={handleSubmit} isSubmitting={loading} />
      </div>
    </div>
  );
};

export default AdminListingComplexNewPage;
