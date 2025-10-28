import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminPageHeader, LoadingSpinner } from "../../../components/admin/ui";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";
const API_DOMAIN = API_BASE_URL.replace(/\/api\/v1$/, "");

const GoodJobDashboardPage = () => {
  const { t } = useTranslation();
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Build GoodJob URL with token as query parameter
      const url = `${API_DOMAIN}/good_job?token=${token}`;
      setIframeUrl(url);
    } else {
      setError("No authentication token found");
    }

    // Add a small delay to show the iframe is loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleIframeError = () => {
    setError("Failed to load dashboard. Please check your connection.");
  };

  return (
    <div className="flex flex-col h-full">
      <AdminPageHeader
        title={t("good_job.title")}
        subtitle={t("good_job.subtitle")}
      />

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              className="w-full h-full min-h-[calc(100vh-12rem)]"
              title="GoodJob Dashboard"
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
              style={{ border: "none" }}
            />
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {t("good_job.no_auth")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoodJobDashboardPage;
