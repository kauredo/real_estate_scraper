import React, { useEffect, useState } from "react";
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
    <div>
      {/* Hero Section - Placeholder */}
      <div className="bg-beige-default text-white p-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Sofia Galvão Group</h1>
        <p className="text-xl">Your Real Estate Partner in Portugal</p>
      </div>

      {/* Featured Properties - Placeholder */}
      <div className="container mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Properties
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map(listing => (
              <div
                key={listing.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={listing.photos?.[0] || "/placeholder.jpg"}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{listing.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {listing.price} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
