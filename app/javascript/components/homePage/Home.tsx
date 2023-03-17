import React, { Suspense, lazy, useLayoutEffect, useState } from "react";
import { Listing, ResultNumbers, Testimonial } from "../utils/Interfaces";
const Newsletter = lazy(() => import("./Newsletter"));
const Cards = lazy(() => import("./Cards"));
const Results = lazy(() => import("./Results"));
import Hero from "../shared/Hero";

interface Props {
  listings: Listing[];
  results: ResultNumbers;
  photos: string[];
  testimonials: Testimonial[];
}

export default function Home(props: Props) {
  const { listings, results, photos, testimonials } = props;
  const [cardsOffset, setCardsOffset] = useState("-219px");

  useLayoutEffect(() => {
    setTimeout(() => {
      const card = document.querySelector(".card .bg-white");

      // setCardsOffset(`${((card.scrollHeight - 32) / 2) * -1 + 4}px`);
      setCardsOffset(`${(card.scrollHeight + 64 + 8) * -1}px`);
    }, 1000);
  }, []);

  return (
    <>
      <Hero photos={photos} />
      <Suspense fallback={<div>Loading...</div>}>
        <Cards listings={listings} />
        <Results results={results} testimonials={testimonials} />
        <Newsletter />
      </Suspense>
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
