import React, { useState } from "react";
import Banner from "./Banner";
import Cards from "./Cards";
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
      <Cards listings={listings} />
    </>
  );
}
