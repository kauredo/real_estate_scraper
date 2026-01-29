import { Listing } from "@/utils/interfaces";
import { Link } from "react-router-dom";
import { truncateText } from "@/utils/functions";
import ListingIcons from "@/components/features/listings/ListingIcons";
import Overlay from "@/components/ui/Overlay";
import Routes from "@/utils/routes";
import { Card as BaseCard, CardContent } from "@/components/ui/Card";

export default function Card({ listing }: { listing: Listing }) {
  return (
    <BaseCard className="m-2 mx-auto max-w-sm flex-shrink-0 relative w-full h-full sm:w-auto dark:opacity-90 dark:border-beige-medium group overflow-hidden">
      <Link to={Routes.listing_path(listing.slug)} className="block h-full">
        <div
          className="object-cover bg-center bg-no-repeat bg-cover object-center w-full h-2/3 min-h-[15rem] relative rounded-t-lg transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          style={{
            backgroundImage: `url(${listing.photos[0]})`,
          }}
        >
          <Overlay status={listing.status} padding={true} show />
        </div>
        <CardContent className="px-6 py-4 h-1/3 justify-between flex flex-col">
          <h2 className="text-l text-dark dark:text-light transition-colors duration-200 group-hover:text-beige-default dark:group-hover:text-beige-medium">
            <span>{truncateText(listing.title, 60)}</span>
          </h2>
          <ListingIcons listing={listing} />
        </CardContent>
      </Link>
    </BaseCard>
  );
}
