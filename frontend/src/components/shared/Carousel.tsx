import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomDots from "./CustomDots";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  items: React.ReactNode[];
  slidesToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  arrows?: boolean;
  dots?: boolean;
  infinite?: boolean;
  responsive?: boolean;
  className?: string;
  centerMode?: boolean;
  showCounter?: boolean;
}

export default function Carousel({
  items,
  slidesToShow = 1,
  autoplay = false,
  autoplaySpeed = 5000,
  arrows = true,
  dots = true,
  infinite = true,
  responsive = true,
  className = "",
  centerMode = false,
  showCounter = true,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (sliderRef.current) {
        if (event.key === "ArrowLeft") {
          sliderRef.current.slickPrev();
        } else if (event.key === "ArrowRight") {
          sliderRef.current.slickNext();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const CustomArrow = ({ className, style, onClick, icon }: any) => (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onPointerDown={onClick}
      role="button"
      tabIndex={0}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );

  const settings = {
    dots,
    infinite,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed,
    arrows,
    centerMode,
    adaptiveHeight: true,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    nextArrow: <CustomArrow icon="chevron-right" />,
    prevArrow: <CustomArrow icon="chevron-left" />,
    responsive: responsive
      ? [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: Math.min(3, slidesToShow),
              slidesToScroll: 1,
              infinite: items.length > 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: Math.min(2, slidesToShow),
              slidesToScroll: 1,
              infinite: items.length > 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: items.length > 1,
            },
          },
        ]
      : undefined,
    appendDots: (dots: React.ReactNode[]) => (
      <CustomDots
        dots={dots}
        numDotsToShow={items.length > 10 ? 10 : items.length}
        dotWidth={30}
      />
    ),
  };

  return (
    <div className={`carousel-container ${className}`}>
      <div className="slider-container relative">
        <Slider {...settings} ref={sliderRef}>
          {items.map((item, index) => (
            <div key={index} className="outline-none">
              {item}
            </div>
          ))}
        </Slider>
      </div>
      {showCounter && items.length > 1 && (
        <div className="text-center text-sm text-gray-500 mt-2">
          {currentSlide + 1} / {items.length}
        </div>
      )}
    </div>
  );
}
