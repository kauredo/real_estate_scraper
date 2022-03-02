import React, { useState } from "react";
import { ListingByCity } from "../utils/Interfaces";
import Banner from "../shared/Banner";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Profile from "./Profile";
import Results from "./Results";

interface Props {
  listings: ListingByCity;
}

export default function Home(props: Props) {
  const listings = props.listings;

  return (
    <>
      <Banner />
      <Profile />
      <Cards listings={listings} />
      <Results />
      <Newsletter />
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
