import React, { useRef, useState } from "react";
import Card from "./Card";

export default function Cards({ listings }) {
  const sliderRef = useRef(null);
  const card = document.querySelector(".card");
  let defaultTransform = 0;
  console.log(card);

  function goNext() {
    defaultTransform = defaultTransform - 398;
    const slider = sliderRef.current;
    if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7)
      defaultTransform = 0;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  }

  function goPrev() {
    const slider = sliderRef.current;
    if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
    else defaultTransform = defaultTransform + 398;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  }

  return (
    <div className="flex items-center justify-center w-full h-full py-8 px-4">
      {/* <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ ---> */}
      <div className="w-full relative flex items-center justify-center">
        <button
          aria-label="slide backward"
          className="absolute z-30 left-0 ml-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
          onClick={goPrev}
        >
          <svg
            className="dark:text-gray-900"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7L7 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="w-full h-full mx-auto overflow-y-hidden">
          <div
            ref={sliderRef}
            className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
          >
            {listings.map(listing => (
              <Card listing={listing} key={listing.id} />
            ))}
          </div>
        </div>
        <button
          aria-label="slide forward"
          className="absolute z-30 right-0 mr-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          onClick={goNext}
        >
          <svg
            className="dark:text-gray-900"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
