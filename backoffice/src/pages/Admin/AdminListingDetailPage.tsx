import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetListing,
  adminDeleteListing,
  generatePreviewToken,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { Listing } from "../../utils/interfaces";
import {
  LoadingSpinner,
  Button,
  PreviewModal,
} from "../../components/admin/ui";

const AdminListingDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<Listing | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await adminGetListing(parseInt(id));
        if (response.data?.listing) {
          setListing(response.data.listing);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm(t("admin.confirmDelete"))) return;

    try {
      await adminDeleteListing(parseInt(id));
      navigate(appRoutes.backoffice.listings);
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handlePreview = async () => {
    if (!id) return;
    try {
      const response = await generatePreviewToken("listing", parseInt(id));
      setPreviewUrl(response.data.preview_url);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!listing) {
    return (
      <div className="container mx-auto flex flex-col px-4">
        <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
          <p className="text-center text-red-500">
            {t("admin.listings.notFound")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
        <div className="mb-6 flex justify-between items-center">
          <Button
            onClick={() => navigate(appRoutes.backoffice.listings)}
            variant="secondary"
            className="bg-gray-500 hover:bg-gray-600"
          >
            {t("common.back")}
          </Button>
          <div className="flex space-x-2">
            <Button
              onClick={handlePreview}
              variant="secondary"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              👁️ Preview
            </Button>
            <Button
              onClick={() =>
                navigate(appRoutes.backoffice.editListing(listing.id))
              }
            >
              {t("common.edit")}
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {t("common.delete")}
            </Button>
          </div>
        </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          previewUrl={previewUrl}
          title={`Preview: ${listing.title}`}
        />

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto mb-6">
          {listing.title}
        </h1>

        <div className="max-w-4xl mx-auto">
          {listing.photos && listing.photos.length > 0 && (
            <div className="mb-6">
              <img
                src={listing.photos[0]}
                alt={listing.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("admin.listings.fields.basicInfo")}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                  <p className="mb-2">
                    <span className="font-medium">
                      {t("admin.listings.fields.title")}:
                    </span>{" "}
                    {listing.title}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">
                      {t("admin.listings.fields.price")}:
                    </span>{" "}
                    €{listing.price?.toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">
                      {t("admin.listings.fields.address")}:
                    </span>{" "}
                    {listing.address}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">
                      {t("admin.listings.fields.kind")}:
                    </span>{" "}
                    {listing.kind}
                  </p>
                  <p>
                    <span className="font-medium">
                      {t("admin.listings.fields.status")}:
                    </span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-sm ${
                        listing.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {t(`common.status.${listing.status}`)}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("admin.listings.fields.details")}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                  <p className="mb-2">
                    <span className="font-medium">
                      {t("admin.listings.fields.objective")}:
                    </span>{" "}
                    {listing.objective || "N/A"}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">
                      {t("admin.listings.fields.kind")}:
                    </span>{" "}
                    {listing.kind || "N/A"}
                  </p>
                  {listing.video_link && (
                    <p className="mb-2">
                      <span className="font-medium">
                        {t("admin.listings.fields.videoLink")}:
                      </span>
                      <a
                        href={listing.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 ml-2"
                      >
                        {t("common.viewVideo")}
                      </a>
                    </p>
                  )}
                  {listing.virtual_tour_url && (
                    <p>
                      <span className="font-medium">
                        {t("admin.listings.fields.virtualTour")}:
                      </span>
                      <a
                        href={listing.virtual_tour_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 ml-2"
                      >
                        {t("common.viewTour")}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("admin.listings.fields.description")}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {listing.description || t("admin.listings.noDescription")}
                  </p>
                </div>
              </div>

              {listing.features && listing.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t("admin.listings.fields.features")}
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                    <ul className="list-disc list-inside space-y-1">
                      {listing.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("admin.listings.fields.metadata")}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded text-sm">
                  <p className="mb-2">
                    <span className="font-medium">ID:</span> {listing.id}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">
                      {t("admin.listings.fields.slug")}:
                    </span>{" "}
                    {listing.slug}
                  </p>
                  {listing.order && (
                    <p>
                      <span className="font-medium">
                        {t("admin.listings.fields.order")}:
                      </span>{" "}
                      {listing.order}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListingDetailPage;
