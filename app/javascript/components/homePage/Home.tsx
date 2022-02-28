import React, { useState } from "react";
import Banner from "./Banner";
import Cards from "./Cards";
import Profile from "./Profile";
export interface Listing {
  stats: {
    [key: string]: string;
  };
  address: string;
  features: string[];
  price: string;
  title: string;
  url: string;
  description: string;
  photos: string[];
}

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
    </>
  );
}

declare global {
  interface Window {
    Routes: any;
  }
}
