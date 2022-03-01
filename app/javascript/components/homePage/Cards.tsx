import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Carousel from "nuka-carousel";

export default function Cards({ listings }) {
  const [slideNumber, setSlideNumber] = useState(1);
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
    <section className="flex items-center justify-center w-full h-full py-8 md:py-0 md:pb-8 px-4">
      <div className="w-full relative flex items-center justify-center">
        <div className="w-full h-full mx-auto overflow-y-hidden">
          <div className="overflow-hidden h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700 my-2">
            <Carousel
              autoplay={slideNumber === 1}
              heightMode="max"
              slidesToShow={slideNumber}
              defaultControlsConfig={{
                nextButtonText: "➤",
                prevButtonStyle: { transform: "rotate(180deg)" },
                prevButtonText: "➤",
                pagingDotsClassName: "mx-1 hidden sm:block",
              }}
            >
              {listings.map(listing => (
                <Card listing={listing} key={listing.id} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
