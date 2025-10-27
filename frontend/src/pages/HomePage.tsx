import { useEffect, useState } from "react";
import { Listing, ResultNumbers, Testimonial } from "../utils/interfaces";
import { getHomePage } from "../services/api";
import { useAsyncOperation } from "../hooks/useAsyncOperation";
import { useTranslation } from "react-i18next";
import { MetaTags } from "../components/shared/MetaTags";
import Hero from "../components/shared/Hero";
import Cards from "../components/homePage/Cards";
import Results from "../components/homePage/Results";
import Newsletter from "../components/homePage/Newsletter";
import HomePageSkeleton from "../components/loading/HomePageSkeleton";

export default function Home() {
  // Create state to hold the data
  const [listings, setListings] = useState<Record<string, Listing[]>>({});
  const [results, setResults] = useState<ResultNumbers | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { isLoading, execute } = useAsyncOperation();
  const { t } = useTranslation();

  // Fetch data when component mounts
  useEffect(() => {
    const fetchHomeData = async () => {
      const result = await execute(
        async () => {
          const response = await getHomePage();
          return response.data;
        },
        {
          errorMessage: t("notifications.messages.data_load_error"),
        },
      );

      if (result) {
        // Extract data from the response
        if (result.listings_by_geography) {
          console.log("Listings by geography:", result.listings_by_geography);
          // Keep the listings grouped by geography
          setListings(result.listings_by_geography);
        }

        if (result.stats) {
          setResults(result.stats as ResultNumbers);
        }

        if (result.photos) {
          setPhotos(result.photos as string[]);
        }

        if (result.testimonials) {
          setTestimonials(result.testimonials as Testimonial[]);
        }
      }
    };

    fetchHomeData();
  }, []);

  // Show loading state
  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <MetaTags pageType="home" image={photos[0]} url={window.location.href} />
      <Hero photos={photos} />
      <Cards listings={listings} />
      {results && <Results results={results} testimonials={testimonials} />}
      <Newsletter />
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
