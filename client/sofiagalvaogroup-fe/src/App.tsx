import React, { useEffect, useState } from "react";
import "./stylesheets/application.tailwind.css.scss";
import Home from "./components/homePage/Home";
import { ResultNumbers } from "./components/utils/Interfaces";
import {
  find_all_listings,
  find_all_photos,
  find_all_testimonials,
  find_all_results,
} from "./utils/getters";

function App() {
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
    <Home
      listings={listings}
      results={results}
      photos={photos}
      testimonials={testimonials}
    />
  );
}

export default App;
