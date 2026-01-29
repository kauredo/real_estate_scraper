import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { ListingComplex } from "@/utils/interfaces";
import CheckIcon from "@/components/svgs/CheckIcon";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";

interface Props {
  listingComplex: ListingComplex;
}

const ListingComplexDetail = ({ listingComplex }: Props) => {
  const { t, i18n } = useTranslation();

  // Extract photo URLs for the lightbox
  const photoUrls = useMemo(
    () => listingComplex.photos.map((photo) => photo.image.url),
    [listingComplex.photos]
  );

  const lightbox = useLightbox(photoUrls);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Photo Lightbox */}
      <Lightbox
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.closeLightbox}
        alt={listingComplex.name}
      />

      {/* Main Photo Gallery */}
      {listingComplex.photos.length > 0 && (
        <div className="mb-8">
          {/* Main image - clickable */}
          <div className="relative mb-4">
            <button
              onClick={() => lightbox.openLightbox(0)}
              className="w-full h-[50vh] md:h-[60vh] cursor-zoom-in rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-beige-default focus:ring-offset-2"
              aria-label={`${t("lightbox.view_image") || "View image"} 1 ${t("lightbox.of") || "of"} ${listingComplex.photos.length}`}
            >
              <img
                src={listingComplex.photos[0].image.url}
                alt={`${listingComplex.name} - 1`}
                className="w-full h-full object-cover transition-transform hover:scale-[1.02]"
                draggable={false}
              />
            </button>
          </div>

          {/* Thumbnail grid */}
          {listingComplex.photos.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {listingComplex.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => lightbox.openLightbox(index)}
                  className={`aspect-square rounded-md overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-beige-default focus:ring-offset-1 transition-opacity ${
                    index === 0 ? "ring-2 ring-beige-default" : "hover:opacity-80"
                  }`}
                  aria-label={`${t("lightbox.view_image") || "View image"} ${index + 1} ${t("lightbox.of") || "of"} ${listingComplex.photos.length}`}
                >
                  <img
                    src={photo.image.url}
                    alt={`${listingComplex.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Click hint */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            {t("listing.click_to_enlarge") || "Click image to enlarge"}
          </p>
        </div>
      )}

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
                  <CheckIcon />
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
              {listingComplex.listings.map((listing) => (
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
