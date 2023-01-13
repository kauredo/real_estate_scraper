import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ListingByCity, ResultNumbers, Testimonial } from "../utils/Interfaces";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Results from "./Results";
import Hero from "../shared/Hero";

interface Props {
  listings: ListingByCity;
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
      <Cards listings={listings} />
      <Results results={results} testimonials={testimonials} />
      <Newsletter />
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
