import { ListingComplex } from "../utils/Interfaces";
import ComplexCard from "./ComplexCard";

interface Props {
  listing_complexes: ListingComplex[];
  backoffice?: boolean;
}

export default function Complexes(props: Props) {
  const { listing_complexes, backoffice } = props;

  return (
    <div className="container mx-auto">
      {listing_complexes?.map(listing_complex => {
        if (!listing_complex.name || !listing_complex.description) return null;

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
