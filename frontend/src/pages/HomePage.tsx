import React, { useEffect, useState } from "react";
import Hero from "../components/shared/Hero";
import Cards from "../components/homePage/Cards";
import Results from "../components/homePage/Results";
import Newsletter from "../components/homePage/Newsletter";
import { getListings } from "../services/api";

const HomePage = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        setLoading(true);
        const response = await getListings({ featured: true, limit: 6 });
        setFeaturedListings(response.data);
      } catch (error) {
        console.error("Error fetching featured listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []);

  return (
    <>
      <Hero photos={photos} />
      <Cards listings={listings} />
      <Results results={results} testimonials={testimonials} />
      <Newsletter />
    </>
  );
};

export default HomePage;
