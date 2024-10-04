import React, { useEffect, useRef, useState } from "react";
import { i18n } from "../../languages/languages";
import { waitForElm } from "../utils/Functions";
import Slider from "react-slick";
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
      const windowWidth = Math.floor((title as HTMLElement).scrollWidth / 400);
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
    <div className="p-6 text-center w-full lg:w-2/3  mx-auto flex justify-center items-center">
      <div className="w-full">
        <h2 id="testimony-title" className="text-2xl mb-4 mx-auto">
          {i18n.t("about.testimonies.title")}
        </h2>

        <Slider {...settings}>
          {testimonials.map(testimonial => (
            <div key={`${testimonial.name}--testimonial`} className="p-6">
              <q>{testimonial.text}</q>
              <span className="font-bold text-right">- {testimonial.name}</span>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
