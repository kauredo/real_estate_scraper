import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "@/components/contactPage/ContactForm";
import type { ListingComplex } from "@/utils/interfaces";
import ShareIcons from "@/components/shared/ShareIcons";
import Routes from "@/utils/routes";
import Carousel from "@/components/shared/Carousel";
import { Button } from "@/components/ui/Button";

interface Props {
  complex: ListingComplex;
}

export default function Show(props: Props) {
  const { t } = useTranslation();
  const { complex } = props;
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
        loading={index === 0 ? "eager" : "lazy"}
        className="object-contain w-full max-h-[70vh] mx-auto"
        src={photo}
        alt={`${complex.name} - ${index + 1}`}
      />
    ));

  return (
    <div className="relative container mx-auto text-black dark:text-light">
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
                  loading="lazy"
                  style={{ width: "90vw", aspectRatio: "16/9" }}
                  src={`${complex.video_link}?autoplay=1&mute=1`}
                  title={complex.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      ) : photoItems && photoItems.length > 0 ? (
        <div className="relative slider-container">
          <Carousel
            items={photoItems}
            className="main-slider"
            showCounter
            infinite={photoItems.length > 1}
          />
        </div>
      ) : null}
      <div className="bottom-4 left-4 font-bold text-large z-50 bg-beige-default dark:bg-beige-medium text-white dark:text-dark px-4 py-2">
        <h1 className="standard">{complex.name}</h1>
      </div>
      {complex.video_link && (
        <div className="text-center mt-4">
          <Button onClick={() => setIsVideoOpen(true)}>
            {t("listing.watch_video")}
          </Button>
        </div>
      )}
      <div className="mt-10">
        <ShareIcons title={complex.name} />
      </div>
      <section className="tablet:grid overflow-hidden tablet:grid-cols-3 tablet:grid-rows-1 gap-2 pb-8 mx-2 whitespace-pre-line">
        <div className="col-span-2">
          <div className=" p-4 description w-full bg-white dark:bg-dark m-2 tablet:mx-0">
            <div className="tablet:mr-2">{complex.description}</div>
          </div>
          <div className="overflow-x-scroll tablet:overflow-auto p-4 description w-full bg-white dark:bg-dark m-2 tablet:mx-0 h-fit">
            <table className="text-sm w-full border-collapse border border-slate-500">
              <thead>
                <tr className="bg-beige-default dark:bg-beige-medium text-white dark:text-dark">
                  <th className="border border-white dark:border-dark border-l-slate-700 p-2">
                    {t("enterprises.show.type")}
                  </th>
                  <th className="border border-white dark:border-dark p-2">
                    {t("enterprises.show.bedrooms")}
                  </th>
                  <th className="border border-white dark:border-dark p-2">
                    {t("enterprises.show.built")}
                  </th>
                  <th className="border border-white dark:border-dark p-2">
                    {t("enterprises.show.living")}
                  </th>
                  <th className="border border-white dark:border-dark p-2">
                    {t("enterprises.show.parking")}
                  </th>
                  <th className="border border-white dark:border-dark p-2">
                    {t("enterprises.show.price")}
                  </th>
                  <th className="border border-white dark:border-dark  border-r-slate-700"></th>
                </tr>
              </thead>
              <tbody>
                {complex.listings?.map((listing) => {
                  return (
                    <tr
                      key={listing.slug}
                      className={"text-center border border-slate-700 relative"}
                    >
                      <td className=" p-2">
                        {["agreed"].includes(listing.status) && (
                          <span className="z-3 absolute top-0 bottom-0 left-0 right-0 bg-beige-default dark:bg-beige-medium font-bold text-white dark:text-dark opacity-50 flex items-center justify-center" />
                        )}
                        {["sold"].includes(listing.status) && (
                          <span className="z-3 absolute top-0 bottom-0 left-0 right-0 bg-black font-bold text-white dark:text-dark opacity-50 flex items-center justify-center" />
                        )}
                        {listing.stats[t("listing.stats.floor")] ||
                          t("common.not_available")}
                      </td>
                      <td className=" p-2">
                        {listing.stats[t("listing.stats.bedrooms")] ||
                          t("common.not_available")}
                      </td>
                      <td className=" p-2">
                        {listing.stats[t("listing.stats.area")] ||
                          t("common.not_available")}
                      </td>
                      <td className=" p-2">
                        {listing.stats[t("listing.stats.living_area")] ||
                          t("common.not_available")}
                      </td>
                      <td className=" p-2">
                        {listing.stats[t("listing.stats.parking")] ||
                          t("common.not_available")}
                      </td>
                      <td className={" p-2 "}>
                        {["sold", "agreed"].includes(listing.status)
                          ? listing.status == "agreed"
                            ? t("listing.status.agreed")
                            : t("listing.status.sold")
                          : `${listing.price} ${t("common.currency")}`}
                      </td>
                      <td className=" p-2">
                        <a
                          href={Routes.listing_path(listing.slug)}
                          target="_blank"
                          className="relative z-10 whitespace-nowrap bg-transparent hover:bg-beige-default dark:hover:bg-beige-medium text-beige-default dark:text-beige-medium  hover:text-white dark:hover:text-dark py-1 px-2 border border-beige-default dark:border-beige-medium hover:border-transparent rounded"
                        >
                          {t("enterprises.show.more")}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-start-3 p-1">
          <ContactForm complex={complex} />
        </div>
      </section>
    </div>
  );
}
