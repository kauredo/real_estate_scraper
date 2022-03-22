import React from "react";
import { Colleague, Listing } from "../utils/Interfaces";
import LongCard from "./LongCard";

interface Props {
  listings: Listing[];
  backoffice?: boolean;
  colleagues?: Colleague[];
}

export default function Listings(props: Props) {
  const { listings, backoffice, colleagues } = props;

  return (
    <div className="container mx-auto">
      {listings.map(listing => {
        const colleague =
          colleagues &&
          colleagues.filter(col => col.id === listing.colleague_id)[0];
        return (
          <LongCard
            backoffice={backoffice}
            colleague={colleague}
            listing={listing}
            key={listing.url}
          />
        );
      })}
    </div>
  );
}
