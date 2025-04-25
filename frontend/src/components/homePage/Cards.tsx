import { useEffect, useState, type ReactNode } from "react";
import Card from "./Card";
import { toCapitalize } from "../../utils/functions";
import { Photo, Listing } from "../../utils/interfaces";
import Slider from "react-slick";
import CustomDots from "../shared/CustomDots";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  listings: Record<string, Listing[]> | Listing[];
  photos?: Photo[];
}

type SliderDots = ReactNode;

export default function Cards(props: Props) {
  const { listings, photos } = props;
  const [slideNumber, setSlideNumber] = useState(1);
  const isGroupedByLocation = !Array.isArray(listings);
  const locations = isGroupedByLocation ? Object.keys(listings) : [];

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = Math.floor(window.innerWidth / 412);
      setSlideNumber(windowWidth > 0 ? windowWidth : 1);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: slideNumber,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    dotsClass: "slick-dots",
    infinite: false,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, slideNumber),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, slideNumber),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: SliderDots) => (
      <CustomDots dots={dots as any[]} numDotsToShow={10} dotWidth={30} />
    ),
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
            <Slider
              {...settings}
              appendDots={(dots: SliderDots) => (
                <CustomDots
                  dots={dots as any[]}
                  numDotsToShow={photos.length > 10 ? 10 : photos.length}
                  dotWidth={30}
                />
              )}
            >
              {photos.map(photo => (
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
            </Slider>
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
            <Slider
              {...settings}
              appendDots={(dots: SliderDots) => (
                <CustomDots
                  dots={dots as any[]}
                  numDotsToShow={
                    locationListings.length > 10 ? 10 : locationListings.length
                  }
                  dotWidth={30}
                />
              )}
            >
              {locationListings.map(listing => (
                <Card listing={listing} key={listing.slug} />
              ))}
            </Slider>
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
          <Slider
            {...settings}
            appendDots={(dots: SliderDots) => (
              <CustomDots
                dots={dots as any[]}
                numDotsToShow={
                  (listings as Listing[]).length > 10
                    ? 10
                    : (listings as Listing[]).length
                }
                dotWidth={30}
              />
            )}
          >
            {(listings as Listing[]).map(listing => (
              <Card listing={listing} key={listing.slug} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
