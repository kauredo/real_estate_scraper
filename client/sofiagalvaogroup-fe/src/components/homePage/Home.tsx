import { useEffect, useState } from "react";
import { ResultNumbers } from "../utils/Interfaces";
import Hero from "../shared/Hero";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Results from "./Results";
import {
  find_all_listings_by_geography,
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
    const fetchData = async () => {
      const tempListings = await find_all_listings_by_geography();
      const tempPhotos = await find_all_photos();
      const tempResults = await find_all_results();
      const tempTestimonials = await find_all_testimonials();

      return { tempListings, tempPhotos, tempResults, tempTestimonials };
    };

    fetchData().then(data => {
      setListings(data.tempListings);
      setPhotos(data.tempPhotos);
      setResults(data.tempResults);
      setTestimonials(data.tempTestimonials);
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
