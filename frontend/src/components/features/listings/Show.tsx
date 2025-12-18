import { useTranslation } from "react-i18next";
import ContactForm from "@/components/features/contact/ContactForm";
import type { ListingComplex } from "@/utils/interfaces";
import ShareIcons from "@/components/ui/ShareIcons";
import Routes from "@/utils/routes";
import Carousel from "@/components/ui/Carousel";

interface Props {
  complex: ListingComplex;
}

export default function Show(props: Props) {
  const { t } = useTranslation();
  const { complex } = props;

  // Collect all unique photos from all listings
  const allPhotos =
    complex.listings &&
    complex.listings.reduce((photos: string[], listing) => {
      listing.photos.forEach((photo) => {
        if (!photos.includes(photo)) {
          photos.push(photo);
        }
      });
      return photos;
    }, []);

  const photoItems =
    allPhotos &&
    allPhotos.map((photo, index) => (
      <img
        key={`photo-${index}`}
        loading={index === 0 ? "eager" : "lazy"}
        className="object-contain w-full max-h-[70vh] mx-auto"
        src={photo}
        alt={`${complex.name} - ${index + 1}`}
      />
    ));

  return (
    <div className="relative bg-white dark:bg-dark min-h-screen">
      {/* Hero Image Carousel */}
      {photoItems && photoItems.length > 0 && (
        <div className="relative slider-container">
          <Carousel
            items={photoItems}
            className="main-slider"
            showCounter
            infinite={photoItems.length > 1}
          />
        </div>
      )}

      {/* Hero Title Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-dark rounded-2xl shadow-xl p-6 tablet:p-8 border-2 border-beige-default dark:border-beige-medium">
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
          {/* Description */}
          {complex.description && (
            <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="p-6 tablet:p-8">
                <div className="mb-6 pb-4 border-b-2 border-beige-default dark:border-beige-medium">
                  <h2 className="text-xl tablet:text-2xl font-bold text-beige-dark dark:text-beige-medium">
                    {t("enterprises.show.description") || "Descrição"}
                  </h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {complex.description}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Contact Form Sidebar */}
        <div className="tablet:col-span-4 mt-8 tablet:mt-0">
          <div className="bg-white dark:bg-dark rounded-2xl shadow-xl border-2 border-beige-default dark:border-beige-medium overflow-hidden">
            <ContactForm complex={complex} />
          </div>
        </div>
      </section>

      {/* Full Width Content Section */}
      <section className="container mx-auto px-4 pb-8 space-y-8">
        {/* Video */}
        {complex.video_link && (
          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="mb-4 pb-4 border-b-2 border-beige-default dark:border-beige-medium">
                  <h2 className="text-xl tablet:text-2xl font-bold text-beige-dark dark:text-beige-medium">
                    {t("listing.video") || "Vídeo"}
                  </h2>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
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

        {/* Listings Table */}
        {complex.listings && complex.listings.length > 0 && (
          <div className="bg-white dark:bg-dark rounded-2xl shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="mb-6 pb-4 border-b-2 border-beige-default dark:border-beige-medium">
                  <h2 className="text-xl tablet:text-2xl font-bold text-beige-dark dark:text-beige-medium">
                    {t("enterprises.show.available_units") ||
                      "Frações Disponíveis"}
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-full">
                    <thead>
                      <tr className="bg-beige-default dark:bg-beige-medium text-white dark:text-dark">
                        <th className="py-4 px-4 text-left font-semibold uppercase tracking-wider text-xs">
                          {t("enterprises.show.type")}
                        </th>
                        <th className="py-4 px-4 text-center font-semibold uppercase tracking-wider text-xs">
                          {t("enterprises.show.bedrooms")}
                        </th>
                        <th className="py-4 px-4 text-center font-semibold uppercase tracking-wider text-xs">
                          {t("enterprises.show.built")}
                        </th>
                        <th className="py-4 px-4 text-center font-semibold uppercase tracking-wider text-xs">
                          {t("enterprises.show.living")}
                        </th>
                        <th className="py-4 px-4 text-center font-semibold uppercase tracking-wider text-xs">
                          {t("enterprises.show.parking")}
                        </th>
                        <th className="py-4 px-4 text-center font-semibold uppercase tracking-wider text-xs">
                          {t("enterprises.show.price")}
                        </th>
                        <th className="py-4 px-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {complex.listings.map((listing, index) => {
                        const isSoldOrAgreed = ["sold", "agreed"].includes(
                          listing.status,
                        );
                        return (
                          <tr
                            key={listing.slug}
                            className={`hover:bg-beige-default/10 dark:hover:bg-beige-medium/10 transition-colors duration-200 ${
                              index % 2 === 0
                                ? "bg-gray-50 dark:bg-gray-900/20"
                                : ""
                            }`}
                          >
                            <td className="py-4 px-4 text-left relative">
                              {listing.status === "agreed" && (
                                <div className="absolute inset-0 bg-beige-default/20 dark:bg-beige-medium/20" />
                              )}
                              {listing.status === "sold" && (
                                <div className="absolute inset-0 bg-gray-900/20" />
                              )}
                              <span className="relative font-medium text-gray-900 dark:text-gray-100">
                                {listing.stats[t("listing.stats.floor")] || "-"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">
                              {listing.stats[t("listing.stats.bedrooms")] ||
                                "-"}
                            </td>
                            <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">
                              {listing.stats[t("listing.stats.area")] || "-"}
                            </td>
                            <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">
                              {listing.stats[t("listing.stats.living_area")] ||
                                "-"}
                            </td>
                            <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">
                              {listing.stats[t("listing.stats.parking")] || "-"}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="font-bold text-lg text-beige-dark dark:text-beige-medium">
                                {isSoldOrAgreed
                                  ? listing.status === "agreed"
                                    ? t("listing.status.agreed")
                                    : t("listing.status.sold")
                                  : listing.price
                                    ? `${listing.price} ${t("common.currency")}`
                                    : "-"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              {!isSoldOrAgreed && (
                                <a
                                  href={Routes.listing_path(listing.slug)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-beige-default hover:bg-beige-medium dark:bg-beige-medium dark:hover:bg-beige-dark text-white dark:text-dark font-medium rounded-lg transition-colors duration-200 shadow hover:shadow-lg"
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
      </section>
    </div>
  );
}
