import React, { useState } from "react";
import Banner from "./Banner";

export interface Listings {
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

export default function Home(listings: Listings) {
  console.log(listings);
  return (
    <>
      <Banner />
    </>
  );
}
