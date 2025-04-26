import { useState } from "react";
import Card from "./Card";
import { toCapitalize } from "../../utils/functions";
import { Photo, Listing } from "../../utils/interfaces";
import Carousel from "../shared/Carousel";

interface Props {
  listings: Record<string, Listing[]> | Listing[];
  photos?: Photo[];
}

export default function Cards(props: Props) {
  const { listings, photos } = props;
  const isGroupedByLocation = !Array.isArray(listings);
  const locations = isGroupedByLocation ? Object.keys(listings) : [];

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
              items={photos.map(photo => (
                <img
                  loading="lazy"
                  key={photo.image.url}
                  style={{
                    maxHeight: "70vh",
                    objectFit: "contain",
                    padding: "0 1rem",
                  }}
                  src={photo.image.url}
                  alt=""
                />
              ))}
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
              {locations.map(location => (
                <button
                  key={`${location}-tab`}
                  onClick={() => setSelectedLocation(location)}
                  className={`whitespace-nowrap py-4 px-6 block hover:text-beige-default dark:hover:text-beige-medium hover:border-beige-default dark:hover:border-beige-medium focus:outline-none border-b-2 font-medium ${
                    selectedLocation === location
                      ? "border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium"
                      : "border-grey text-grey dark:text-light"
                  }`}
                >
                  {`${toCapitalize(location)} (${locationListings.length})`}
                </button>
              ))}
            </div>
            <Carousel
              items={locationListings.map(listing => (
                <Card listing={listing} key={listing.slug} />
              ))}
              autoplay
              autoplaySpeed={5000}
              infinite={false}
              responsive
              slidesToShow={Math.floor(window.innerWidth / 412)}
            />
          </div>
        </div>
      </section>
    );
  }

  // Show listings without location grouping
  return (
    <section
      id="cards"
      className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
    >
      <div className="w-full relative flex items-center justify-center">
        <div className="w-full h-full mx-auto">
          <Carousel
            items={(listings as Listing[]).map(listing => (
              <Card listing={listing} key={listing.slug} />
            ))}
            autoplay
            autoplaySpeed={5000}
            infinite={false}
            responsive
            slidesToShow={Math.floor(window.innerWidth / 412)}
          />
        </div>
      </div>
    </section>
  );
}
