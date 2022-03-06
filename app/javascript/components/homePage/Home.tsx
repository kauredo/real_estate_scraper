import React, { useState } from "react";
import { ListingByCity, ResultNumbers } from "../utils/Interfaces";
import Banner from "../shared/Banner";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Profile from "./Profile";
import Results from "./Results";

interface Props {
  listings: ListingByCity;
  results: ResultNumbers;
}

export default function Home(props: Props) {
  const { listings, results } = props;

  return (
    <>
      <Banner />
      <Profile />
      <Cards listings={listings} />
      <div className="relative">
        <div
          id="background-change"
          className="absolute top-0 bottom-0 left-0 right-0 bg-beige z-[-10]"
          style={{
            top: "-219px",
          }}
        ></div>
        <Results results={results} />
        <Newsletter />
      </div>
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
