import { useState, useEffect, useRef, useCallback } from "react";
import { Listing } from "@/utils/interfaces";
import ContactForm from "@/components/features/contact/ContactForm";
import { useTranslation } from "react-i18next";
import { ReadMore } from "@/components/ui/ReadMore";
import Overlay from "@/components/ui/Overlay";
import ShareIcons from "@/components/ui/ShareIcons";
import Carousel from "@/components/ui/Carousel";
import { Button } from "@/components/ui/Button";

interface Props {
  listing: Listing;
}

export default function Show(props: Props) {
  const listing = props.listing;
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  // Focus trap for modal
  useEffect(() => {
    if (isOpen) {
      // Store the element that had focus before opening
      const previouslyFocused = document.activeElement as HTMLElement;

      // Add escape key listener
      document.addEventListener("keydown", handleKeyDown);

      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        // Return focus to the trigger button
        previouslyFocused?.focus?.();
      };
    }
  }, [isOpen, handleKeyDown]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const photos = listing.photos?.map((photo, index) => (
    <img
      key={`photo-${index}`}
      loading={index === 0 ? "eager" : "lazy"}
      className="object-contain w-full max-h-[70vh] mx-auto"
      src={photo}
      alt={`${listing.title} - ${index + 1}`}
    />
  ));

  return (
    <>
      {listing.video_link && isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 bg-beige-default dark:bg-beige-medium z-[100]"
          ref={modalRef}
        >
          <div
            className="flex justify-center items-center h-full p-4"
            onClick={handleBackdropClick}
          >
            <div className="relative max-w-[90vw] w-full">
              {/* Hidden title for screen readers */}
              <h2 id="video-modal-title" className="sr-only">
                {t("listing.watch_video")}: {listing.title}
              </h2>

              {/* Close button */}
              <Button
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
                aria-label={t("common.close") || "Close"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>

              <iframe
                loading="lazy"
                className="w-full aspect-video"
                src={`${listing.video_link}?autoplay=1&mute=1`}
                title={`${t("listing.watch_video")}: ${listing.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
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
                    ref={triggerButtonRef}
                    onClick={() => setOpen(true)}
                    type="button"
                  >
                    {t("listing.watch_video")}
                  </Button>
                </div>
              )}
              {listing.virtual_tour_url && (
                <div className="mb-2">
                  <a
                    href={listing.virtual_tour_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="button">{t("listing.virtual_tour")}</Button>
                  </a>
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
