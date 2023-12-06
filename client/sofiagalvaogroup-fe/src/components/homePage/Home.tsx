import { useEffect, useState } from "react";
import { ResultNumbers } from "../utils/Interfaces";
import Hero from "../shared/Hero";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Results from "./Results";
import {
  find_all_listings,
  find_all_photos,
  find_all_testimonials,
  find_all_results,
} from "../../utils/getters";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [results, setResults] = useState({} as ResultNumbers | any);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    find_all_listings().then((listings: any) => {
      setListings(listings);
      console.log("listings", listings);
    });

    find_all_photos().then((photos: any) => {
      setPhotos(photos);
      console.log("photos", photos);
    });

    find_all_results().then((results: any) => {
      setResults(results);
      console.log("results", results);
    });

    find_all_testimonials().then((testimonials: any) => {
      setTestimonials(testimonials);
      console.log("testimonials", testimonials);
    });
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
