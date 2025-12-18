import { Listing } from "@/utils/interfaces";
import UnifiedCard from "./UnifiedCard";

interface Props {
  listing: Listing;
  small?: boolean;
  variant?: "horizontal" | "vertical";
}

export default function LongCard({
  listing,
  small = false,
  variant = "horizontal",
}: Props) {
  return (
    <UnifiedCard
      type="listing"
      listing={listing}
      variant={variant}
      size={small ? "small" : "default"}
      showIcons={!small}
      clickable={!small}
      className={variant === "vertical" ? "" : small ? "" : "lg:w-1/2"}
    />
  );
}
