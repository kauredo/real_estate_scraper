import Carousel from "nuka-carousel";
import React, { useEffect, useRef, useState } from "react";
import { i18n } from "../../languages/languages";
import { waitForElm } from "../utils/Functions";

import { Testimonial } from "../utils/Interfaces";

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials(props: Props) {
  const { testimonials } = props;
  const [slideNumber, setSlideNumber] = useState(1);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();
    return;
  }, []);

  const handleResize = () => {
    waitForElm("#testimony-title").then(title => {
      const windowWidth = Math.floor(title.scrollWidth / 400);
      if (windowWidth == 0) {
        setSlideNumber(1);
      } else {
        setSlideNumber(windowWidth);
      }
    });
  };

  const slidesToShow = () => {
    if (slideNumber > testimonials.length) {
      return testimonials.length;
    } else {
      return slideNumber;
    }
  };

  return (
    <div className="p-6 text-center w-full lg:w-2/3  mx-auto flex justify-center items-center">
      <div className="w-full">
        <h2 id="testimony-title" className="text-2xl mb-4 mx-auto">
          {i18n.t("about.testimonies.title")}
        </h2>
        <ul className="w-full h-full flex lg:gap-8 lg:gap-6 items-center justify-start transition ease-out duration-700 my-2">
          <Carousel
            autoplay={slideNumber === 1}
            slidesToShow={slidesToShow()}
            heightMode="max"
            defaultControlsConfig={{
              nextButtonText: "➤",
              prevButtonStyle: {
                transform: "rotate(180deg)",
                left: "-1.5rem",
                position: "relative",
              },
              nextButtonStyle: { right: "-1.5rem", position: "relative" },
              prevButtonText: "➤",
              pagingDotsClassName: "mx-1 hidden sm:block",
            }}
          >
            {testimonials?.map(testimonial => {
              return (
                <li key={`${testimonial.name}--testimonial`} className="p-6">
                  <div className="h-full w-full text-left flex flex-col">
                    <q>{testimonial.text}</q>
                    <span className="font-bold text-right">
                      - {testimonial.name}
                    </span>
                  </div>
                </li>
              );
            })}
          </Carousel>
        </ul>
      </div>
    </div>
  );
}
