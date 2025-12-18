import { useState } from "react";
import { Listing } from "../../utils/interfaces";
import ContactForm from "../contactPage/ContactForm";
import { useTranslation } from "react-i18next";
import { ReadMore } from "../shared/ReadMore";
import Overlay from "../shared/Overlay";
import ShareIcons from "../shared/ShareIcons";
import Carousel from "../shared/Carousel";
import Button from "../ui/Button";

interface Props {
  listing: Listing;
}

export default function Show(props: Props) {
  const listing = props.listing;
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const photos = listing.photos?.map((photo, index) => (
    <img
      loading={index === 0 ? "eager" : "lazy"}
      className="object-contain w-full max-h-[70vh] mx-auto"
      src={photo}
      alt={`${listing.title} - ${index + 1}`}
    />
  ));

  return (
    <>
      {listing.video_link && isOpen && (
        <section
          className="modal bg-beige-default dark:bg-beige-medium fixed top-0 bottom-0 w-full h-full"
          style={{ zIndex: 100 }}
        >
          <div
            className="flex justify-center items-center h-[100vh]"
            onClick={() => setOpen(false)}
          >
            <div>
              <div className="relative">
                <iframe
                  loading="lazy"
                  style={{ width: "90vw", aspectRatio: "16/9" }}
                  src={`${listing.video_link}?autoplay=1&mute=1`}
                  title={listing.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="relative container mx-auto overflow-hidden sm:overflow-visible text-black dark:text-light">
        <div className="pb-6 bg-white dark:bg-dark text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
            <h1
              id="main-title"
              className="relative block mt-2 text-2xl text-dark dark:text-light sm:text-4xl px-4"
            >
              {listing.status === "agreed" && (
                <span>{t("listing.status.agreed")} - </span>
              )}
              {listing.status === "sold" && (
                <span>{t("listing.status.sold")} - </span>
              )}
              {listing.title}
            </h1>
          </div>
        </div>

        <div className="relative slider-container">
          <Overlay status={listing.status} />
          <Carousel
            items={photos || []}
            className="main-slider"
            autoplay
            showCounter={false}
            infinite={false}
          />
        </div>

        <div className="mt-12">
          <ShareIcons title={listing.title} />
        </div>
        <section className="tablet:grid tablet:grid-cols-3 tablet:grid-rows-1 gap-2 pb-8 mx-2 whitespace-pre-line">
          <div className="col-span-2">
            <div className="p-4 w-full bg-white dark:bg-dark m-2 tablet:mx-0">
              {listing.video_link && (
                <div className="mb-2">
                  <Button
                    onClick={() => setOpen(true)}
                    className="cursor-pointer bg-beige-default dark:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {t("listing.watch_video")}
                  </Button>
                </div>
              )}
              {listing.virtual_tour_url && (
                <div className="mb-2">
                  <Button
                    onClick={() =>
                      window.open(listing.virtual_tour_url, "_blank")
                    }
                    className="cursor-pointer bg-beige-default dark:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {t("listing.open_tour")}
                  </Button>
                </div>
              )}
              <h2 className="standard mb-2 text-2xl font-bold">
                {t("listing.details")}
                {listing.status === "agreed" && (
                  <span> ({t("listing.status.agreed")})</span>
                )}
                {listing.status === "sold" && (
                  <span> ({t("listing.status.sold")})</span>
                )}
              </h2>
              <div className="w-full flex flex-wrap">
                <div key={"price"} className="border p-2 w-1/2">
                  <span className="font-bold">{t("listing.price")}:</span>
                  <br />
                  <span>{listing.price} €</span>
                </div>
                {Object.keys(listing.stats)?.map((k) => {
                  return (
                    <div key={k} className="border p-2 w-1/2">
                      <span className="font-bold">
                        {t(`listing.stats.${k.toLowerCase()}`)}:
                      </span>
                      <br />
                      <span>{listing.stats[k]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 w-full bg-white dark:bg-dark m-2 tablet:mx-0">
              <div className="tablet:mr-2">
                <ReadMore length={1000}>{listing.description}</ReadMore>
              </div>
            </div>
            {listing?.features?.length > 0 && (
              <div className="p-4 w-full bg-white dark:bg-dark m-2 tablet:mx-0 h-fit">
                <h2 className="standard mb-2 text-2xl font-bold">
                  {t("listing.characteristics")}
                </h2>
                <ul
                  className="tablet:ml-2 grid gap-4"
                  style={{
                    gridTemplateColumns:
                      "repeat( auto-fit, minmax(230px, 1fr) )",
                  }}
                >
                  {listing?.features?.map((feat) => {
                    return (
                      <li key={feat} className="mx-8 list-disc">
                        {feat}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="col-start-3 p-1">
            <ContactForm listing={listing} />
          </div>
        </section>
      </div>
    </>
  );
}
