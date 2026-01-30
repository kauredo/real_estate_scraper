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
  "aria-label"?: string;
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
  "aria-label": ariaLabel,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause/play toggle for autoplay carousels
  const toggleAutoplay = useCallback(() => {
    if (isPaused) {
      sliderRef.current?.slickPlay();
      setIsPaused(false);
    } else {
      sliderRef.current?.slickPause();
      setIsPaused(true);
    }
  }, [isPaused]);

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

  // Keyboard navigation handlers
  const goToPrev = useCallback(() => {
    sliderRef.current?.slickPrev();
  }, []);

  const goToNext = useCallback(() => {
    sliderRef.current?.slickNext();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
      }
    },
    [goToPrev, goToNext]
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
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2 rounded-lg`}
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel || "Image carousel"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="slider-container relative">
        <Slider {...settings} ref={sliderRef}>
          {items.map((item, index) => (
            <div
              key={index}
              className="carousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${items.length}`}
            >
              <div data-slide-content>{item}</div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Controls row: pause button and counter */}
      {(autoplay || (showCounter && items.length > 1)) && (
        <div className="flex items-center justify-center gap-4 mt-2">
          {autoplay && (
            <button
              type="button"
              onClick={toggleAutoplay}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={isPaused}
            >
              {isPaused ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )}
          {showCounter && items.length > 1 && (
            <div
              className="text-sm text-gray-500 dark:text-gray-400"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentSlide + 1} / {items.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
