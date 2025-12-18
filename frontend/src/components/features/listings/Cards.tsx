import { useState, useEffect } from "react";
import Card from "./Card";
import { toCapitalize } from "@/utils/functions";
import { Photo, Listing } from "@/utils/interfaces";
import Carousel from "@/components/ui/Carousel";
import { Button } from "@/components/ui/Button";

interface Props {
  listings: Record<string, Listing[]> | Listing[];
  photos?: Photo[];
}

export default function Cards(props: Props) {
  const { listings, photos } = props;
  const [windowWidth, setWindowWidth] = useState(1200); // Default width
  const isGroupedByLocation = !Array.isArray(listings);
  const locations = isGroupedByLocation ? Object.keys(listings) : [];

  // Handle window resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      setWindowWidth(window.innerWidth); // Set initial width
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Calculate slides to show with better logic
  const getSlidesToShow = () => {
    const slideWidth = 412;
    const actualWidth = Math.min(windowWidth, 1400); // Limit to a maximum width
    const calculatedSlides = Math.floor(actualWidth / slideWidth);
    return Math.max(1, calculatedSlides); // Ensure at least 1 slide is shown
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
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="w-full relative flex items-center justify-center">
          <div className="w-full h-full mx-auto">
            <Carousel
              items={photos.map((photo) => {
                // if photo has image_url, use it, otherwise use photo.image.url
                const image_url = photo.image_url || photo.image.url;
                return (
                  <img
                    loading="lazy"
                    key={image_url}
                    style={{
                      maxHeight: "70vh",
                      objectFit: "contain",
                      padding: "0 1rem",
                    }}
                    src={image_url}
                    alt=""
                  />
                );
              })}
              autoplay
              autoplaySpeed={5000}
              infinite={false}
            />
          </div>
        </div>
      </section>
    );
  }

  // Show listings grouped by location
  if (isGroupedByLocation && locations.length > 0) {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);
    const locationListings = listings[selectedLocation] || [];

    return (
      <section
        id="cards"
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="w-full relative flex items-center justify-center">
          <div className="w-full h-full mx-auto">
            <div className="sm:w-min mx-auto flex flex-col sm:flex-row mb-6">
              {locations.map((location) => (
                <Button
                  key={`${location}-tab`}
                  onClick={() => setSelectedLocation(location)}
                  className={`whitespace-nowrap py-4 px-6 block hover:text-beige-default dark:hover:text-beige-medium hover:border-beige-default dark:hover:border-beige-medium focus:outline-none border-b-2 font-medium ${
                    selectedLocation === location
                      ? "border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium"
                      : "border-grey text-grey dark:text-light"
                  }`}
                >
                  {`${toCapitalize(location)} (${
                    listings[location]?.length || 0
                  })`}
                </Button>
              ))}
            </div>
            <Carousel
              items={locationListings.map((listing) => (
                <Card listing={listing} key={listing.slug} />
              ))}
              autoplay
              autoplaySpeed={5000}
              infinite={false}
              responsive
              slidesToShow={getSlidesToShow()}
            />
          </div>
        </div>
      </section>
    );
  }

  // Show listings without location grouping
  // Flatten the grouped listings if they come as Record<string, Listing[]>
  const flatListings = isGroupedByLocation
    ? Object.values(listings).flat()
    : (listings as Listing[]);

  return (
    <section
      id="cards"
      className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
    >
      <div className="w-full relative flex items-center justify-center">
        <div className="w-full h-full mx-auto">
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
        </div>
      </div>
    </section>
  );
}
