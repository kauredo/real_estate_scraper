import { useEffect, useState } from "react";
import { Listing, ResultNumbers, Testimonial } from "../utils/interfaces";
import { getHomePage } from "../services/api";
import { MetaTags } from "../components/shared/MetaTags";
import Hero from "../components/shared/Hero";
import Cards from "../components/homePage/Cards";
import Results from "../components/homePage/Results";
import Newsletter from "../components/homePage/Newsletter";

export default function Home() {
  // Create state to hold the data
  const [listings, setListings] = useState<Record<string, Listing[]>>({});
  const [results, setResults] = useState<ResultNumbers | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const response = await getHomePage();
        const data = response.data;

        // Extract data from the response
        if (data.listings_by_geography) {
          console.log("Listings by geography:", data.listings_by_geography);
          // Keep the listings grouped by geography
          setListings(data.listings_by_geography);
        }

        if (data.stats) {
          setResults(data.stats as ResultNumbers);
        }

        if (data.photos) {
          setPhotos(data.photos as string[]);
        }

        if (data.testimonials) {
          setTestimonials(data.testimonials as Testimonial[]);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError("Failed to load home page data");
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  // If no results data yet, show a placeholder
  if (!results) {
    return (
      <div className="flex justify-center items-center h-screen">
        No data available
      </div>
    );
  }

  return (
    <>
      <MetaTags pageType="home" image={photos[0]} url={window.location.href} />
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
