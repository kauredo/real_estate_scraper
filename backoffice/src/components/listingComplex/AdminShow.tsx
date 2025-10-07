import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminDeleteListingComplex } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import type { ListingComplex } from "../../utils/interfaces";
import ShareIcons from "../shared/ShareIcons";
import Carousel from "../shared/Carousel";

interface Props {
  complex: ListingComplex;
  isAdmin?: boolean;
}

export default function AdminShow(props: Props) {
  const { t } = useTranslation();
  const { complex, isAdmin = true } = props;
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Collect all unique photos from all listings
  const allPhotos = complex.listings.reduce((photos: string[], listing) => {
    listing.photos.forEach((photo) => {
      if (!photos.includes(photo)) {
        photos.push(photo);
      }
    });
    return photos;
  }, []);

  const photoItems = allPhotos.map((photo, index) => (
    <img
      loading={index === 0 ? "eager" : "lazy"}
      className="object-contain w-full max-h-[70vh] mx-auto"
      src={photo}
      alt={`${complex.name} - ${index + 1}`}
    />
  ));

  const handleDelete = async () => {
    if (!window.confirm(t("admin.confirmDelete"))) return;

    try {
      await adminDeleteListingComplex(complex.id);
      navigate(appRoutes.backoffice.listingComplexes);
    } catch (error) {
      console.error("Error deleting listing complex:", error);
    }
  };

  return (
    <div className="relative container mx-auto text-black dark:text-light">
      {/* Admin Header */}
      {isAdmin && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium mr-4">
                🔒 {t("admin.previewMode")}
              </div>
              <span className="text-red-700 dark:text-red-300 text-sm">
                {t("admin.listingComplexes.previewDescription")}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(appRoutes.backoffice.listingComplexes)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm"
              >
                {t("common.back")}
              </button>
              <button
                onClick={() =>
                  navigate(appRoutes.backoffice.editListingComplex(complex.id))
                }
                className="bg-beige-default hover:bg-beige-medium text-white font-bold py-2 px-4 rounded text-sm"
              >
                {t("common.edit")}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
              >
                {t("common.delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {complex.video_link && isVideoOpen ? (
        <section
          className="modal bg-beige-default dark:bg-beige-medium fixed top-0 bottom-0 w-full h-full"
          style={{ zIndex: 100 }}
        >
          <div
            className="flex justify-center items-center h-[100vh]"
            onClick={() => setIsVideoOpen(false)}
          >
            <div>
              <div className="relative">
                <iframe
                  id="iframe"
                  style={{ height: "auto", aspectRatio: "16/9", width: "85vw" }}
                  className="mx-auto border-8 border-white dark:border-dark"
                  src={`${complex.video_link}?autoplay=1&mute=1`}
                  allow="autoplay"
                  allowFullScreen
                />
                <button
                  className="absolute top-2 right-2 bg-white dark:bg-dark text-black dark:text-white rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => setIsVideoOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-8">
          {photoItems.length > 0 && <Carousel items={photoItems} />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-dark dark:text-light">
                {complex.name}
              </h1>

              {complex.subtext && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {complex.subtext}
                </p>
              )}

              {complex.description && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{complex.description}</p>
                </div>
              )}
            </div>

            {complex.video_link && (
              <div className="mb-8">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="bg-beige-default hover:bg-beige-medium text-white font-bold py-3 px-6 rounded-lg flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  {t("listingComplex.watchVideo")}
                </button>
              </div>
            )}

            {complex.features && complex.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">
                  {t("listingComplex.features")}
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {complex.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {complex.final_text && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{complex.final_text}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {t("listingComplex.details")}
                </h3>

                {complex.location && (
                  <div className="mb-3">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {t("listingComplex.location")}:
                    </span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {complex.location}
                    </span>
                  </div>
                )}

                {complex.price_from && (
                  <div className="mb-3">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {t("listingComplex.priceFrom")}:
                    </span>
                    <span className="ml-2 text-lg font-bold text-beige-default">
                      €{complex.price_from.toLocaleString()}
                    </span>
                  </div>
                )}

                {complex.listings && complex.listings.length > 0 && (
                  <div className="mb-3">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {t("listingComplex.availableUnits")}:
                    </span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {complex.listings.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <ShareIcons title={complex.name} />
              </div>

              {!isAdmin && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4">
                    {t("contact.title")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t("listingComplex.contactDescription")}
                  </p>
                  {/* Contact form would go here in non-admin version */}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
