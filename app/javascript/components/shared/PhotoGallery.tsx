import React, { useState } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface Props {
  photos: string[];
}

export default function PhotoGallery({ photos }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getGridLayout = () => {
    switch (photos.length) {
      case 1:
        return "flex justify-center";
      case 2:
        return "grid grid-cols-2";
      case 3:
        return "grid grid-cols-3";
      case 4:
        return "grid grid-cols-2";
      default:
        return "grid grid-cols-3";
    }
  };

  const getImageClass = (index: number) => {
    switch (photos.length) {
      case 1:
        return "max-w-3xl w-full h-[500px]";
      case 2:
        return "w-full h-[400px]";
      case 3:
        return "w-full h-[300px]";
      case 4:
        return `w-full ${index < 2 ? "h-[400px]" : "h-[300px]"}`;
      default:
        return `w-full ${index < 3 ? "h-[350px]" : "h-[250px]"}`;
    }
  };

  return (
    <div className="mb-8">
      <div className={`gap-4 ${getGridLayout()}`}>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt=""
            className={`
              rounded cursor-pointer object-cover
              ${getImageClass(index)}
            `}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <button onClick={goToPrevious} className="absolute left-4 text-white">
            <ChevronLeftIcon className="h-8 w-8" />
          </button>

          <img
            src={photos[currentImageIndex]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button onClick={goToNext} className="absolute right-4 text-white">
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
}
