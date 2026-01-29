import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import ContactForm from "@/components/features/contact/ContactForm";
import Cards from "@/components/features/listings/Cards";
import { ListingComplex } from "@/utils/interfaces";
import Carousel from "@/components/ui/Carousel";
import ShareIcons from "@/components/ui/ShareIcons";
import Routes from "@/utils/routes";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";

interface Props {
  complex: ListingComplex;
}

export default function NewShow(props: Props) {
  const { t } = useTranslation();
  const { complex } = props;

  // Extract photo URLs for the lightbox
  const photoUrls = useMemo(
    () =>
      complex.photos?.map(
        (photo) => photo.image_url || (photo.image && photo.image.url)
      ) || [],
    [complex.photos]
  );

  const lightbox = useLightbox(photoUrls);

  return (
    <div className="relative bg-white dark:bg-dark min-h-screen">
      {/* Photo Lightbox */}
      <Lightbox
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.closeLightbox}
        alt={complex.name}
      />

      {/* Hero Image Carousel with Video */}
      {complex?.photos?.length > 0 && (
        <div className="relative slider-container">
          <Carousel
            items={complex.photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => lightbox.openLightbox(index)}
                className="w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-beige-default focus:ring-offset-2"
                aria-label={`${t("lightbox.view_image") || "View image"} ${index + 1} ${t("lightbox.of") || "of"} ${complex.photos.length}`}
              >
                <img
                  loading="lazy"
                  className="object-contain w-full max-h-[70vh] mx-auto"
                  src={photo.image_url || (photo.image && photo.image.url)}
                  alt={`${complex.name} - ${index + 1}`}
                  draggable={false}
                />
              </button>
            ))}
            showCounter
            infinite={complex.photos.length > 1}
          />
          {/* Click hint */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t("listing.click_to_enlarge") || "Click image to enlarge"}
          </p>
        </div>
      )}

      {/* Hero Title Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white dark:bg-dark rounded-2xl shadow-2xl p-6 tablet:p-8 border-2 border-beige-default dark:border-beige-medium">
          <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
            <h1 className="text-2xl tablet:text-4xl font-bold text-beige-dark dark:text-beige-medium">
              {complex.name}
            </h1>
            <ShareIcons title={complex.name} />
          </div>
        </div>
      </div>

      {/* Description and Contact Grid */}
      <section className="container mx-auto tablet:grid tablet:grid-cols-12 gap-8 py-8 px-4">
        <div className="tablet:col-span-8 space-y-8">
          {/* Main Description */}
          {complex.description && (
            <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="p-6 tablet:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-beige-default dark:bg-beige-medium rounded-full" />
                  <h2 className="text-xl tablet:text-2xl font-bold text-gray-800 dark:text-light">
                    {t("enterprises.show.description") || "Descrição"}
                  </h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {complex.description}
                </div>
              </div>
            </div>
          )}

          {/* Subtext */}
          {complex.subtext && (
            <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="p-6 tablet:p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {complex.subtext}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Form Sidebar */}
        <div className="tablet:col-span-4 mt-8 tablet:mt-0">
          <div className="border-2 border-beige-default dark:border-beige-medium rounded-2xl shadow-xl overflow-hidden">
            <ContactForm complex={complex} />
          </div>
        </div>
      </section>

      {/* Full Width Tables Section */}
      <section className="container mx-auto px-4 pb-8 space-y-8">
        {/* Listings Table */}
        {complex.listings && complex.listings.length > 0 && (
          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-beige-default dark:bg-beige-medium rounded-full" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-light">
                  {t("enterprises.show.available_units") || "Frações"}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-beige-default dark:bg-beige-medium text-white dark:text-dark">
                      <th className="py-3 px-3 text-left font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.type")}
                      </th>
                      <th className="py-3 px-3 text-center font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.bedrooms")}
                      </th>
                      <th className="py-3 px-3 text-center font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.built")}
                      </th>
                      <th className="py-3 px-3 text-center font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.living")}
                      </th>
                      <th className="py-3 px-3 text-center font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.parking")}
                      </th>
                      <th className="py-3 px-3 text-center font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.price")}
                      </th>
                      <th className="py-3 px-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {complex.listings.map((listing, index) => {
                      const isSoldOrAgreed = ["sold", "agreed"].includes(
                        listing.status
                      );
                      return (
                        <tr
                          key={listing.slug}
                          className={`group hover:bg-beige-default/10 dark:hover:bg-beige-medium/10 transition-all duration-200 ${
                            index % 2 === 0
                              ? "bg-gray-50/30 dark:bg-gray-900/20"
                              : ""
                          }`}
                        >
                          <td className="py-3 px-3 text-left relative">
                            {listing.status === "agreed" && (
                              <div className="absolute inset-0 bg-beige-default/20" />
                            )}
                            {listing.status === "sold" && (
                              <div className="absolute inset-0 bg-gray-900/20" />
                            )}
                            <span className="relative font-medium text-gray-900 dark:text-gray-100">
                              {listing.stats?.[t("listing.stats.floor")] || "-"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center text-gray-700 dark:text-gray-300">
                            {listing.stats?.[t("listing.stats.bedrooms")] ||
                              "-"}
                          </td>
                          <td className="py-3 px-3 text-center text-gray-700 dark:text-gray-300">
                            {listing.stats?.[t("listing.stats.area")] || "-"}
                          </td>
                          <td className="py-3 px-3 text-center text-gray-700 dark:text-gray-300">
                            {listing.stats?.[t("listing.stats.living_area")] ||
                              "-"}
                          </td>
                          <td className="py-3 px-3 text-center text-gray-700 dark:text-gray-300">
                            {listing.stats?.[t("listing.stats.parking")] || "-"}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="font-bold text-base text-beige-dark dark:text-beige-medium">
                              {isSoldOrAgreed
                                ? listing.status === "agreed"
                                  ? t("listing.status.agreed")
                                  : t("listing.status.sold")
                                : listing.price
                                  ? `${listing.price} ${t("common.currency")}`
                                  : "-"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            {!isSoldOrAgreed && (
                              <a
                                href={Routes.listing_path(listing.slug)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-beige-default hover:bg-beige-medium dark:bg-beige-medium dark:hover:bg-beige-dark text-white dark:text-dark text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                              >
                                {t("enterprises.show.more")} →
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Price Table */}
        {complex.listing_prices && complex.listing_prices[1]?.length > 0 && (
          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-beige-default dark:bg-beige-medium rounded-full" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-light">
                  {t("enterprises.show.price_table") || "Tabela de Preços"}
                </h2>
              </div>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-beige-default dark:bg-beige-medium text-white dark:text-dark">
                      <th className="py-3 px-4 text-center font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.bedrooms")}
                      </th>
                      <th className="py-3 px-4 text-center font-semibold uppercase tracking-wider text-xs">
                        {t("enterprises.show.price")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {complex.listing_prices[1].map((prices, index) => (
                      <tr
                        key={`${prices[0]}-${index}`}
                        className={`hover:bg-beige-default/10 dark:hover:bg-beige-medium/10 transition-all duration-200 ${
                          index % 2 === 0
                            ? "bg-gray-50/30 dark:bg-gray-900/20"
                            : ""
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {prices[0]}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-beige-dark dark:text-beige-medium">
                          {prices[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Video */}
        {complex.video_link && (
          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-beige-default dark:bg-beige-medium rounded-full" />
                <h2 className="text-xl tablet:text-2xl font-bold text-gray-800 dark:text-light">
                  {t("listing.video") || "Vídeo"}
                </h2>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={complex.video_link}
                  title={`${complex.name} - ${t("listing.video")}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Final Text */}
        {complex.final_text && (
          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="p-6 tablet:p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {complex.final_text}
              </div>
            </div>
          </div>
        )}

        {/* Listing Cards */}
        {complex.listings && complex.listings.length > 0 && (
          <div className="pt-4">
            <Cards
              listings={complex.listings.filter(
                (l) =>
                  l.status === "new" ||
                  l.status === "standard" ||
                  l.status === "recent"
              )}
              photos={complex.photos}
            />
          </div>
        )}
      </section>
    </div>
  );
}
