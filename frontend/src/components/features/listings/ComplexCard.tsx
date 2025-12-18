import { ListingComplex } from "@/utils/interfaces";
import UnifiedCard from "./UnifiedCard";

interface Props {
  listing_complex: ListingComplex;
}

export default function ComplexCard({ listing_complex }: Props) {
  return (
    <UnifiedCard
      type="complex"
      complex={listing_complex}
      variant="horizontal"
    />
  );
}
