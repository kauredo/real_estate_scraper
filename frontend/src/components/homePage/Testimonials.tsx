import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { waitForElm } from "../../utils/functions";
import { Testimonial } from "../../utils/interfaces";
import Slider from "react-slick";
// import MagicSliderDots from "react-magic-slider-dots";

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials(props: Props) {
  const { t, i18n } = useTranslation();
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
          {t("about.testimonies.title")}
        </h2>

        <Slider
          {...settings}
          appendDots={dots => {
            return (
              <></>
              // <MagicSliderDots
              //   dots={dots}
              //   numDotsToShow={
              //     testimonials.length > 10 ? 10 : testimonials.length
              //   }
              //   dotWidth={30}
              // />
            );
          }}
        >
          {testimonials.map(testimonial => (
            <div
              key={`${testimonial.name}--testimonial`}
              className="p-6 text-left flex flex-col max-w-[400px] mx-auto text-dark dark:text-light"
            >
              <p className="whitespace-pre-line">
                <span className="inline-block mr-1 text-xl">"</span>
                {testimonial.text}
                <span className="inline-block ml-1 text-xl">"</span>
              </p>
              <p className="font-bold text-right">- {testimonial.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
