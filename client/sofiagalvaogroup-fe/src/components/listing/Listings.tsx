import { Listing } from "../utils/Interfaces";
import LongCard from "./LongCard";

interface Props {
  listings: Listing[];
  backoffice: boolean;
  listingsCount?: number;
  setListingsCount?: (count: number) => void;
}

export default function Listings(props: Props) {
  const { listings, backoffice, listingsCount, setListingsCount } = props;

  return (
    <div className="container mx-auto">
      {listings?.map(listing => {
        return (
          <LongCard
            backoffice={backoffice}
            listing={listing}
            key={listing.url}
            listingsCount={listingsCount}
            setListingsCount={setListingsCount}
          />
        );
      })}
    </div>
  );
}
