import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { toCapitalize, lazyloadImages } from "../utils/Functions";
import { Photo, Listing } from "../utils/Interfaces";
import Slider from "react-slick";
import MagicSliderDots from "react-magic-slider-dots";

interface Props {
  listings: Listing[];
  photos?: Photo[];
}

export default function Cards(props: Props) {
  const { listings, photos } = props;
  const [slideNumber, setSlideNumber] = useState(1);
  const locations = Object.keys(listings);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();

    return;
  }, []);

  const handleResize = () => {
    const windowWidth = Math.floor(window.innerWidth / 412);
    if (windowWidth == 0) {
      setSlideNumber(1);
    } else {
      setSlideNumber(windowWidth);
    }
  };

  const settings = {
    autoplay: slideNumber === 1,
    autoplaySpeed: 5000,
    slidesToShow: slideNumber,
    arrows: true,
    dots: true,
    dotsClass: "slick-dots",
    infinite: false,
    speed: 500,
    // appendDots: dots => {
    //   return <MagicSliderDots dots={dots} numDotsToShow={10} dotWidth={30} />;
    // },
  };

  if (locations.length !== listings.length) {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    return (
      <section
        id="cards"
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="w-full relative flex items-center justify-center">
          <div className="w-full h-full mx-auto">
            <div className="sm:w-min mx-auto flex flex-col sm:flex-row mb-6">
              {locations?.map(location => (
                <button
                  key={`${location}-tab`}
                  onClick={() => setSelectedLocation(location)}
                  className={`whitespace-nowrap py-4 px-6 block hover:text-beige-default dark:hover:text-beige-dark hover:border-beige-default dark:hover:border-beige-dark focus:outline-none border-b-2 font-medium ${
                    selectedLocation === location
                      ? "border-beige-default dark:border-beige-dark text-beige-default dark:text-beige-dark"
                      : "border-grey text-grey dark:text-light"
                  }`}
                >
                  {`${toCapitalize(location)} (${listings[location].length})`}
                </button>
              ))}
            </div>
            <Slider
              appendDots={dots => (
                <MagicSliderDots
                  dots={dots}
                  numDotsToShow={
                    listings[selectedLocation]?.length > 10
                      ? 10
                      : listings[selectedLocation]?.length
                  }
                  dotWidth={30}
                />
              )}
              {...settings}
            >
              {listings[selectedLocation]?.map(listing => (
                <Card listing={listing} key={listing.slug} />
              ))}
            </Slider>
          </div>
        </div>
      </section>
    );
  } else if (listings.length === 0 && photos && photos.length > 0) {
    return (
      <section
        id="card"
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="w-full relative flex items-center justify-center">
          <div className="w-full h-full mx-auto">
            <Slider
              {...settings}
              appendDots={dots => (
                <MagicSliderDots
                  dots={dots}
                  numDotsToShow={photos.length > 10 ? 10 : photos.length}
                  dotWidth={30}
                />
              )}
            >
              {photos?.map(photo => {
                return (
                  <img
                    loading="lazy"
                    key={photo.image.url}
                    style={{
                      maxHeight: "70vh",
                      objectFit: "contain",
                      padding: "0 1rem",
                    }}
                    src={photo.image.url}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section
        id="cards"
        className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
      >
        <div className="w-full relative flex items-center justify-center">
          <div className="w-full h-full mx-auto">
            <Slider
              {...settings}
              appendDots={dots => (
                <MagicSliderDots
                  dots={dots}
                  numDotsToShow={listings.length > 10 ? 10 : listings.length}
                  dotWidth={30}
                />
              )}
            >
              {listings?.map(listing => (
                <Card listing={listing} key={listing.slug} />
              ))}
            </Slider>
          </div>
        </div>
      </section>
    );
  }
}
