import { Listing } from "@/utils/interfaces";
import UnifiedCard from "./UnifiedCard";

interface Props {
  listing: Listing;
  small?: boolean;
}

export default function LongCard({ listing, small = false }: Props) {
  return (
    <UnifiedCard
      type="listing"
      listing={listing}
      variant="horizontal"
      size={small ? "small" : "default"}
      showIcons={!small}
      clickable={!small}
      className={small ? "" : "lg:w-1/2"}
    />
  );
}
