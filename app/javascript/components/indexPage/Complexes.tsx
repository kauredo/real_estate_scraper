import React from "react";
import { Listing, ListingComplex } from "../utils/Interfaces";
import ComplexCard from "./ComplexCard";

interface Props {
  listingComplexes: ListingComplex[];
  allListings: Listing[];
  backoffice?: boolean;
}

export default function Complexes(props: Props) {
  const { listingComplexes, allListings, backoffice } = props;

  return (
    <div className="container mx-auto">
      {listingComplexes.map(listingComplex => {
        const listings =
          allListings &&
          allListings.filter(
            listing => listing.listing_complex_id === listingComplex.id
          );
        return (
          <ComplexCard
            backoffice={backoffice}
            listings={listings}
            listingComplex={listingComplex}
            key={listingComplex.name}
          />
        );
      })}
    </div>
  );
}
