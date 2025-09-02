import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminDeleteListingComplex } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import type { ListingComplex } from "../../utils/interfaces";
import ShareIcons from "../shared/ShareIcons";

interface Props {
  complex: ListingComplex;
  isAdmin?: boolean;
}

export default function AdminNewShow(props: Props) {
  const { t } = useTranslation();
  const { complex, isAdmin = true } = props;
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Collect all unique photos from all listings
  const allPhotos = complex.listings.reduce((photos: string[], listing) => {
    listing.photos.forEach(photo => {
      if (!photos.includes(photo)) {
        photos.push(photo);
      }
    });
    return photos;
  }, []);

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
    <div className="relative">
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

      {/* Video Modal */}
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

      {/* Header Section */}
      <div className="relative h-screen bg-gray-900">
        {/* Background Image */}
        {allPhotos.length > 0 && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${allPhotos[0]})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        )}

        {/* Header Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              {complex.name}
            </h1>
            {complex.subtext && (
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {complex.subtext}
              </p>
            )}

            {complex.video_link && (
              <button
                onClick={() => setIsVideoOpen(true)}
                className="bg-beige-default hover:bg-beige-medium text-white font-bold py-4 px-8 rounded-lg flex items-center mx-auto"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                {t("listingComplex.watchVideo")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {complex.description && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-dark dark:text-light">
                  {t("listingComplex.about")}
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                    {complex.description}
                  </p>
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {allPhotos.length > 1 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-dark dark:text-light">
                  {t("listingComplex.gallery")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allPhotos.slice(1).map((photo, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg"
                    >
                      <img
                        src={photo}
                        alt={`${complex.name} - ${index + 2}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {complex.features && complex.features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-dark dark:text-light">
                  {t("listingComplex.features")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complex.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-beige-default rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {complex.final_text && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {complex.final_text}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-dark dark:text-light">
                  {t("listingComplex.quickInfo")}
                </h3>

                {complex.location && (
                  <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-beige-default mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {complex.location}
                      </span>
                    </div>
                  </div>
                )}

                {complex.price_from && (
                  <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 block">
                        {t("listingComplex.priceFrom")}
                      </span>
                      <span className="text-3xl font-bold text-beige-default">
                        €{complex.price_from.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {complex.listings && complex.listings.length > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {t("listingComplex.availableUnits")}
                      </span>
                      <span className="text-beige-default font-bold">
                        {complex.listings.length}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Share Section */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <ShareIcons title={complex.name} />
              </div>

              {/* Contact Section - Only show in non-admin mode */}
              {!isAdmin && (
                <div className="bg-beige-default dark:bg-beige-medium text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">
                    {t("contact.title")}
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    {t("listingComplex.contactDescription")}
                  </p>
                  {/* Contact form would go here in non-admin version */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
