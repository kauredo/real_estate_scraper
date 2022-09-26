import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Carousel from "nuka-carousel";
import { toCapitalize } from "../utils/Functions";

export default function Cards({ listings }) {
  const [slideNumber, setSlideNumber] = useState(1);
  const locations = Object.keys(listings);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

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

  return (
    <section
      id="cards"
      className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4"
    >
      <div className="w-full relative flex items-center justify-center">
        <div className="w-full h-full mx-auto overflow-y-hidden">
          <div className="sm:w-min mx-auto flex flex-col sm:flex-row mb-6">
            {locations.map(location => (
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
          <div className="overflow-hidden h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700 my-2">
            <Carousel
              autoplay={slideNumber === 1}
              heightMode="max"
              slidesToShow={slideNumber}
              defaultControlsConfig={{
                nextButtonText: "➤",
                prevButtonStyle: { transform: "rotate(180deg)" },
                prevButtonText: "➤",
                pagingDotsContainerClassName: "!top-0",
                pagingDotsClassName: "mx-1 hidden sm:block",
              }}
            >
              {listings[selectedLocation].map(listing => (
                <Card listing={listing} key={listing.id} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
