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
      <Results results={results} />
      <Newsletter />
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
