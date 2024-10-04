import React, { useEffect, useRef, useState } from "react";
import { i18n } from "../../languages/languages";
import { waitForElm } from "../utils/Functions";
import { Testimonial } from "../utils/Interfaces";
import Slider from "react-slick";
import MagicSliderDots from "react-magic-slider-dots";

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
      const windowWidth = Math.floor((title as HTMLElement).scrollWidth / 350);
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

  const settings = {
    autoplay: slideNumber === 1,
    autoplaySpeed: 5000,
    slidesToShow: slidesToShow(),
    arrows: true,
    dots: true,
    dotsClass: "slick-dots",
    infinite: false,
    speed: 500,
  };

  return (
    <div className="p-6 text-center w-full max-w-[850px] mx-auto flex justify-center items-center">
      <div className="w-full">
        <h2 id="testimony-title" className="text-2xl mb-4 mx-auto">
          {i18n.t("about.testimonies.title")}
        </h2>

        <Slider
          {...settings}
          appendDots={dots => {
            return (
              <MagicSliderDots
                dots={dots}
                numDotsToShow={
                  testimonials.length > 10 ? 10 : testimonials.length
                }
                dotWidth={30}
              />
            );
          }}
        >
          {testimonials.map(testimonial => (
            <div
              key={`${testimonial.name}--testimonial`}
              className="p-6 text-left flex flex-col max-w-[400px] mx-auto"
            >
              <q>{testimonial.text}</q>
              <p className="font-bold text-right">- {testimonial.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
