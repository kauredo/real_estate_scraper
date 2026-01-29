import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import { toCapitalize } from "@/utils/functions";
import { Photo, Listing } from "@/utils/interfaces";
import Carousel from "@/components/ui/Carousel";
import Tabs from "@/components/ui/Tabs";
import { Lightbox, useLightbox } from "@/components/ui/Lightbox";

interface Props {
  listings: Record<string, Listing[]> | Listing[];
  photos?: Photo[];
}

export default function Cards(props: Props) {
  const { t } = useTranslation();
  const { listings, photos } = props;
  const [windowWidth, setWindowWidth] = useState(1200);
  const isGroupedByLocation = !Array.isArray(listings);
  const locations = isGroupedByLocation ? Object.keys(listings) : [];

  // Extract photo URLs for lightbox
  const photoUrls = useMemo(() => {
    if (!photos || photos.length === 0) return [];
    return photos.map((photo) => photo.image_url || photo.image.url);
  }, [photos]);

  const lightbox = useLightbox(photoUrls);

  // Handle window resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Calculate slides to show
  const getSlidesToShow = () => {
    const slideWidth = 412;
    const actualWidth = Math.min(windowWidth, 1400);
    const calculatedSlides = Math.floor(actualWidth / slideWidth);
    return Math.max(1, calculatedSlides);
  };

  // Show photos only if there are no listings but photos exist
  if (
    ((!isGroupedByLocation && (listings as Listing[]).length === 0) ||
      (isGroupedByLocation && Object.values(listings).flat().length === 0)) &&
    photos &&
    photos.length > 0
  ) {
    return (
      <section
        id="cards"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.initialIndex}
          isOpen={lightbox.isOpen}
          onClose={lightbox.closeLightbox}
          alt="Gallery"
        />
        <Carousel
          items={photos.map((photo, index) => {
            const image_url = photo.image_url || photo.image.url;
            return (
              <button
                key={image_url}
                onClick={() => lightbox.openLightbox(index)}
                className="w-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-beige-default focus:ring-offset-2"
                aria-label={`${t("lightbox.view_image") || "View image"} ${index + 1} ${t("lightbox.of") || "of"} ${photos.length}`}
              >
                <img
                  loading="lazy"
                  style={{
                    maxHeight: "70vh",
                    objectFit: "contain",
                    padding: "0 1rem",
                  }}
                  src={image_url}
                  alt={`Photo ${index + 1}`}
                  draggable={false}
                />
              </button>
            );
          })}
          autoplay
          autoplaySpeed={5000}
          infinite={false}
        />
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          {t("listing.click_to_enlarge") || "Click image to enlarge"}
        </p>
      </section>
    );
  }

  // Show listings grouped by location
  if (isGroupedByLocation && locations.length > 0) {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    const locationTabs = locations.map((location) => ({
      id: location,
      label: `${toCapitalize(location)} (${listings[location]?.length || 0})`,
      content: (
        <Carousel
          items={(listings[location] || []).map((listing) => (
            <Card listing={listing} key={listing.slug} />
          ))}
          autoplay
          autoplaySpeed={5000}
          infinite={false}
          responsive
          slidesToShow={getSlidesToShow()}
        />
      ),
    }));

    return (
      <section
        id="cards"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <Tabs
          tabs={locationTabs}
          activeTab={selectedLocation}
          onTabChange={setSelectedLocation}
          variant="line"
          centered
          className="mb-6"
        />
      </section>
    );
  }

  // Show listings without location grouping
  const flatListings = isGroupedByLocation
    ? Object.values(listings).flat()
    : (listings as Listing[]);

  return (
    <section
      id="cards"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Carousel
        items={flatListings.map((listing) => (
          <Card listing={listing} key={listing.slug} />
        ))}
        autoplay
        autoplaySpeed={5000}
        infinite={false}
        responsive
        slidesToShow={getSlidesToShow()}
      />
    </section>
  );
}
