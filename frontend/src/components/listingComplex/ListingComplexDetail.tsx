import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ListingComplex } from "../../utils/interfaces";

interface Props {
  listingComplex: ListingComplex;
}

const ListingComplexDetail = ({ listingComplex }: Props) => {
  const { t, i18n } = useTranslation();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex(prev =>
      prev === listingComplex.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(prev =>
      prev === 0 ? listingComplex.photos.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Photo Gallery */}
      <div className="relative mb-8 h-[60vh]">
        {listingComplex.photos.length > 0 && (
          <>
            <img
              src={listingComplex.photos[currentPhotoIndex].image.url}
              alt={`${listingComplex.name} - ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {listingComplex.photos.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={prevPhoto}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextPhoto}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {listingComplex.name}
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {t("listing_complex.location")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {listingComplex.location}
          </p>
        </div>

        {listingComplex.price_from > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {t("listing_complex.starting_price")}
            </h2>
            <p className="text-2xl font-bold text-primary">
              {listingComplex.price_from.toLocaleString(
                i18n.language === "en" ? "en-US" : "pt-PT",
                {
                  style: "currency",
                  currency: "EUR",
                }
              )}
            </p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {t("listing_complex.description")}
          </h2>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: listingComplex.description }}
          />
        </div>

        {listingComplex.features && listingComplex.features.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("listing_complex.features")}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listingComplex.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {listingComplex.listings && listingComplex.listings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("listing_complex.available_units")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listingComplex.listings.map(listing => (
                <div
                  key={listing.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                >
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {Object.entries(listing.stats)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(" · ")}
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    {listing.price.toLocaleString(
                      i18n.language === "en" ? "en-US" : "pt-PT",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingComplexDetail;
