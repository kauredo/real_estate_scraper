import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/functions";
import { Button } from "@/components/ui/Button";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt = "Image",
}: LightboxProps) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset to initial index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoading(true);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
          setIsLoading(true);
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
          setIsLoading(true);
          break;
        case "Home":
          e.preventDefault();
          setCurrentIndex(0);
          setIsLoading(true);
          break;
        case "End":
          e.preventDefault();
          setCurrentIndex(images.length - 1);
          setIsLoading(true);
          break;
      }
    },
    [images.length, onClose]
  );

  // Focus management and event listeners
  useEffect(() => {
    if (isOpen) {
      const previouslyFocused = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus the close button when opening
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        previouslyFocused?.focus?.();
      };
    }
  }, [isOpen, handleKeyDown]);

  // Scroll thumbnail into view when currentIndex changes
  useEffect(() => {
    if (isOpen && thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex, isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsLoading(true);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setIsLoading(true);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("lightbox.title") || "Image gallery"}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
    >
      {/* Header with close button and counter */}
      <div className="flex items-center justify-between p-4 text-white">
        <span className="text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        <Button
          ref={closeButtonRef}
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          aria-label={t("common.close") || "Close"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center px-4 relative min-h-0"
        onClick={handleBackdropClick}
      >
        {/* Previous button */}
        {images.length > 1 && (
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-4 z-10 text-white hover:bg-white/20 h-12 w-12"
            aria-label={t("lightbox.previous") || "Previous image"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
        )}

        {/* Main image */}
        <div className="relative max-h-full max-w-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            className={cn(
              "max-h-[calc(100vh-200px)] max-w-full object-contain transition-opacity duration-200",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            draggable={false}
          />
        </div>

        {/* Next button */}
        {images.length > 1 && (
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 z-10 text-white hover:bg-white/20 h-12 w-12"
            aria-label={t("lightbox.next") || "Next image"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="p-4 bg-black/50">
          <div
            className="flex gap-2 overflow-x-auto pb-2 justify-center max-w-full"
            role="tablist"
            aria-label={t("lightbox.thumbnails") || "Image thumbnails"}
          >
            {images.map((image, index) => (
              <button
                key={index}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                onClick={() => goToImage(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`${t("lightbox.view_image") || "View image"} ${index + 1}`}
                className={cn(
                  "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black",
                  index === currentIndex
                    ? "border-white opacity-100 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard hint */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 text-xs hidden md:block">
        {t("lightbox.keyboard_hint") ||
          "Use arrow keys to navigate, Escape to close"}
      </div>
    </div>
  );
}

// Hook to manage lightbox state
export function useLightbox(images: string[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const openLightbox = useCallback((index: number = 0) => {
    setInitialIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    initialIndex,
    openLightbox,
    closeLightbox,
    images,
  };
}
