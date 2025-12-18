import { useEffect, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import CustomDots from "./CustomDots";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: unknown[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

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
  dynamicHeight?: boolean;
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
  showCounter = false,
  dynamicHeight = false,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateHeight = useCallback(() => {
    if (!dynamicHeight || !containerRef.current) return;

    const activeSlides = containerRef.current.querySelectorAll(".slick-active");
    if (activeSlides.length > 0) {
      let maxHeight = 0;
      activeSlides.forEach((slide) => {
        const content = slide.querySelector("[data-slide-content]");
        if (content) {
          const height = content.getBoundingClientRect().height;
          maxHeight = Math.max(maxHeight, height);
        }
      });

      if (maxHeight > 0) {
        const slickList = containerRef.current.querySelector(
          ".slick-list",
        ) as HTMLElement;
        if (slickList) {
          slickList.style.height = `${maxHeight}px`;
        }
      }
    }
  }, [dynamicHeight]);

  // Update height on slide change
  useEffect(() => {
    if (dynamicHeight) {
      const timer = setTimeout(updateHeight, 100);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, dynamicHeight, updateHeight]);

  // Update height on window resize
  useEffect(() => {
    if (dynamicHeight) {
      const handleResize = debounce(updateHeight, 100);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [dynamicHeight, updateHeight]);

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
    adaptiveHeight: false, // We handle height manually
    useCSS: true,
    cssEase: "ease-in-out",
    beforeChange: (_: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    afterChange: () => {
      updateHeight();
    },
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
    appendDots: (dots: React.ReactNode[]) => {
      return <CustomDots dots={dots} dotWidth={15} />;
    },
  };

  return (
    <div
      className={`carousel-container ${className} ${
        dynamicHeight ? "dynamic-height-carousel" : ""
      }`}
      ref={containerRef}
    >
      <div className="slider-container relative">
        <Slider {...settings} ref={sliderRef}>
          {items.map((item, index) => (
            <div key={index} className="carousel-slide">
              <div data-slide-content>{item}</div>
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
