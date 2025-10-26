import React from "react";
import { Listing, ListingComplex } from "../../utils/interfaces";
import ComplexCard from "./ComplexCard";

interface Props {
  listing_complexes: ListingComplex[];
  backoffice?: boolean;
}

export default function Complexes(props: Props) {
  const { listing_complexes, backoffice } = props;

  return (
    <div className="container mx-auto">
      {listing_complexes?.map((listing_complex) => {
        return (
          <ComplexCard
            backoffice={backoffice}
            listing_complex={listing_complex}
            key={listing_complex.name}
          />
        );
      })}
    </div>
  );
}
