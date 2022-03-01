import React from "react";
import { Listing } from "../utils/Interfaces";
import LongCard from "./LongCard";

interface Props {
  listings: Listing[];
}

export default function Listings(props: Props) {
  const { listings } = props;
  return (
    <div className="container mx-auto">
      {listings.map(listing => {
        return <LongCard listing={listing} key={listing.url} />;
      })}
    </div>
  );
}
