import React from "react";
import { Listing, ResultNumbers, Testimonial } from "../utils/Interfaces";
import Hero from "../shared/Hero";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Results from "./Results";

interface Props {
  listings: Listing[];
  results: ResultNumbers;
  photos: string[];
  testimonials: Testimonial[];
}

export default function Home(props: Props) {
  const { listings, results, photos, testimonials } = props;

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
