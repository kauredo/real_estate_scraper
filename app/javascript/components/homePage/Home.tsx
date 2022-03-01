import React, { useState } from "react";
import Banner from "../shared/Banner";
import Newsletter from "./Newsletter";
import Cards from "./Cards";
import Profile from "./Profile";
import { Listing } from "../utils/Interfaces";

interface Props {
  listings: Listing[];
}

export default function Home(props: Props) {
  const listings = props.listings;

  return (
    <>
      <Banner />
      <Profile />
      <Cards listings={listings} />
      <Newsletter />
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
