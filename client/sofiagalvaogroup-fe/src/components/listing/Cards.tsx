import { useEffect, useState } from "react";
import Card from "./Card";
import { toCapitalize, lazyloadImages } from "../utils/Functions";
import { Photo, Listing } from "../utils/Interfaces";
import CarouselComponent from "../shared/CarouselComponent";
import SectionComponent from "../shared/SectionComponent";

interface Props {
  listings: Listing[];
  photos?: Photo[];
}

export default function Cards(props: Props) {
  const { listings, photos } = props;
  const [slideNumber, setSlideNumber] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
  const locations = Object.keys(listings);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();

    return;
  }, []);

  useEffect(() => {
    if (listings && locations && locations.length !== listings.length) {
      setSelectedLocation(locations[0]);
    }
  }, [listings]);

  const handleResize = () => {
    const windowWidth = Math.floor(window.innerWidth / 412);
    if (windowWidth === 0) {
      setSlideNumber(1);
    } else {
      setSlideNumber(windowWidth);
    }
  };

  lazyloadImages();

  if (listings && locations && locations.length !== listings.length) {
    return (
      <SectionComponent
        id="cards"
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="sm:w-min mx-auto flex flex-col sm:flex-row mb-6">
          {locations?.map(location => (
            <button
              key={`${location}-tab`}
              onClick={() => setSelectedLocation(location)}
              className={`whitespace-nowrap py-4 px-6 block hover:text-beige hover:border-beige focus:outline-none border-b-2 font-medium ${
                selectedLocation === location
                  ? "border-beige text-beige"
                  : "border-grey text-grey"
              }`}
            >
              {`${toCapitalize(location)} (${listings[location].length})`}
            </button>
          ))}
        </div>
        <CarouselComponent
          slideNumber={slideNumber}
          items={listings[selectedLocation]}
          renderItem={listing => <Card listing={listing} key={listing.slug} />}
        />
      </SectionComponent>
    );
  } else if (listings.length === 0 && photos && photos.length > 0) {
    return (
      <SectionComponent
        id="card"
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="overflow-hidden h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700 my-2">
          <CarouselComponent
            items={photos}
            slideNumber={slideNumber}
            renderItem={photo => (
              <img
                loading="lazy"
                key={photo.image.url}
                alt={""}
                style={{
                  maxHeight: "70vh",
                  objectFit: "contain",
                  padding: "0 1rem",
                }}
                src={photo.image.url}
              />
            )}
          />
        </div>
      </SectionComponent>
    );
  } else {
    return (
      <SectionComponent
        id="cards"
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="overflow-hidden h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700 my-2">
          <CarouselComponent
            items={listings}
            slideNumber={slideNumber}
            renderItem={listing => (
              <Card listing={listing} key={listing.slug} />
            )}
          />
        </div>
      </SectionComponent>
    );
  }
}
