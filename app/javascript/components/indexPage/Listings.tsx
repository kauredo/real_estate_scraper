import React from "react";
import { Listing } from "../utils/Interfaces";
import LongCard from "./LongCard";

interface Props {
  listings: Listing[];
  backoffice?: boolean;
}

export default function Listings(props: Props) {
  const { listings, backoffice } = props;
  return (
    <div className="container mx-auto">
      {listings.map(listing => {
        return (
          <LongCard
            backoffice={backoffice}
            listing={listing}
            key={listing.url}
          />
        );
      })}
    </div>
  );
}
