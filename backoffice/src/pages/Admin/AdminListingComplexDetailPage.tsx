import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { adminGetListingComplex } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import type { ListingComplex } from "../../utils/interfaces";
import AdminShow from "../../components/listingComplex/AdminShow";
import AdminNewShow from "../../components/listingComplex/AdminNewShow";

const AdminListingComplexDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [complex, setComplex] = useState<ListingComplex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplex = async () => {
      if (!id) {
        setError("No ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await adminGetListingComplex(parseInt(id));
        // Handle both response formats
        const complexData = response.data?.listing_complex || response;
        setComplex(complexData);
      } catch (error) {
        console.error("Error fetching listing complex:", error);
        setError("Failed to fetch listing complex");
      } finally {
        setLoading(false);
      }
    };

    fetchComplex();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  if (error || !complex) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            {t("errors.listingComplexNotFound")}
          </h1>
          <p className="text-gray-600 mb-4">{error || t("errors.generic")}</p>
          <button
            onClick={() => navigate(appRoutes.backoffice.listingComplexes)}
            className="bg-beige-default hover:bg-beige-medium text-white font-bold py-2 px-4 rounded"
          >
            {t("common.back")}
          </button>
        </div>
      </div>
    );
  }

  // Use the same conditional rendering logic as the public version
  const shouldUseNewFormat = complex.new_format;

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-light">
      {shouldUseNewFormat ? (
        <AdminNewShow complex={complex} isAdmin={true} />
      ) : (
        <AdminShow complex={complex} isAdmin={true} />
      )}
    </div>
  );
};

export default AdminListingComplexDetailPage;
