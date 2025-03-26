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

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt=""
            className="w-full h-64 object-cover cursor-pointer rounded"
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
