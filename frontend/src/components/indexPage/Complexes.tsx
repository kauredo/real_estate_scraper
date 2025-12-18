import { ListingComplex } from "../../utils/interfaces";
import ComplexCard from "./ComplexCard";

interface Props {
  listing_complexes: ListingComplex[];
}

export default function Complexes(props: Props) {
  const { listing_complexes } = props;

  return (
    <div className="container mx-auto">
      {listing_complexes?.map((listing_complex) => {
        return (
          <ComplexCard
            listing_complex={listing_complex}
            key={listing_complex.name}
          />
        );
      })}
    </div>
  );
}
