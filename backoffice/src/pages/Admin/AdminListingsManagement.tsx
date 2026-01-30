import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  adminCreateListing,
  adminFetchListingComplex,
} from "../../services/api";

const AdminListingsManagement = () => {
  const { t } = useTranslation("backoffice");
  const [listingUrl, setListingUrl] = useState("");
  const [complexUrl, setComplexUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!listingUrl.startsWith("https://www.kwportugal.pt/")) {
      setMessage({
        text: t("listings.url_error"),
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      await adminCreateListing({ url: listingUrl });

      setMessage({
        text: t("listings.add_success"),
        type: "success",
      });
      setListingUrl("");
    } catch {
      setMessage({
        text: t("listings.add_error"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplexSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!complexUrl.startsWith("https://www.kwportugal.pt/")) {
      setMessage({
        text: t("listings.url_error"),
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      await adminFetchListingComplex({ url: complexUrl });

      setMessage({
        text: t("listing_complexes.add_success"),
        type: "success",
      });
      setComplexUrl("");
    } catch {
      setMessage({
        text: t("listing_complexes.add_error"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-dark dark:text-light border-b pb-2">
        {t("listings.title")}
      </h1>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listings Section */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            {t("listings.links_title")}
          </h2>
          <p className="text-gray-500 dark:text-light mb-6">
            {t("listings.links_note")}
          </p>

          <form onSubmit={handleListingSubmit}>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="url"
                className="flex-1 bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark px-4 py-2 rounded"
              >
                {loading ? t("listings.processing") : t("listings.add_to_queue")}
              </button>
            </div>
          </form>
        </div>

        {/* Complexes Section */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            {t("listing_complexes.links_title")}
          </h2>
          <p className="text-gray-500 dark:text-light mb-6">
            {t("listing_complexes.links_note")}
          </p>

          <form onSubmit={handleComplexSubmit}>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={complexUrl}
                onChange={(e) => setComplexUrl(e.target.value)}
                placeholder="url"
                className="flex-1 bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark px-4 py-2 rounded"
              >
                {loading ? t("listings.processing") : t("listings.add_to_queue")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminListingsManagement;
