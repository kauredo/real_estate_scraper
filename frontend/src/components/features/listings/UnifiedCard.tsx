import { Link } from "react-router-dom";
import { Listing, ListingComplex } from "@/utils/interfaces";
import { truncateText } from "@/utils/functions";
import { optimizeCloudinaryUrl } from "@/utils/imageOptimization";
import ListingIcons from "@/components/features/listings/ListingIcons";
import Overlay from "@/components/ui/Overlay";
import Routes from "@/utils/routes";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { cn } from "@/utils/functions";

interface BaseCardProps {
  variant?: "vertical" | "horizontal";
  size?: "default" | "small";
  className?: string;
}

interface ListingCardProps extends BaseCardProps {
  type: "listing";
  listing: Listing;
  showIcons?: boolean;
  clickable?: boolean;
}

interface ComplexCardProps extends BaseCardProps {
  type: "complex";
  complex: ListingComplex;
}

type UnifiedCardProps = ListingCardProps | ComplexCardProps;

export default function UnifiedCard(props: UnifiedCardProps) {
  const { variant = "vertical", size = "default", className } = props;

  if (props.type === "listing") {
    const { listing, showIcons = true, clickable = true } = props;

    if (!listing || !listing.title) return null;

    const photo = listing.photos
      ? optimizeCloudinaryUrl(listing.photos[0], {
          width: 800,
          height: 600,
          quality: "auto",
          format: "auto",
        })
      : "";

    const slugOrId = listing.slug || listing.id;
    const href = clickable ? Routes.listing_path(slugOrId) : "#";

    const isVertical = variant === "vertical";
    const isSmall = size === "small";

    const containerClasses = cn(
      "w-full max-w-7xl mx-auto px-4",
      isSmall ? "my-2" : "my-8",
      className,
    );

    const cardClasses = cn(
      "relative m-0 flex dark:border-beige-medium dark:border-2",
      isVertical ? "flex-col" : "flex-col sm:flex-row",
      isSmall ? "h-48" : "md:h-80",
    );

    const imageContainerClasses = cn(
      "relative",
      isVertical
        ? "w-full"
        : isSmall
          ? "flex-shrink-0 w-1/2 md:w-1/3"
          : "flex-shrink-0 w-full sm:w-1/3",
    );

    const contentClasses = cn(
      "flex-1 p-6 flex flex-col",
      !isVertical && "w-full md:w-2/3",
    );

    const titleClasses = cn(
      "mb-3",
      isSmall ? "text-sm md:text-2xl" : "text-2xl",
    );

    return (
      <div className={containerClasses}>
        <Link
          to={href}
          onClick={(e) => !clickable && e.preventDefault()}
          className={!clickable ? "cursor-not-allowed" : ""}
        >
          <Card className={cardClasses}>
            <div className={imageContainerClasses}>
              <Overlay status={listing.status} show />
              <img
                loading="lazy"
                decoding="async"
                alt={listing.title}
                className="w-full h-full object-cover"
                src={photo}
              />
            </div>
            <CardContent className={contentClasses}>
              <CardTitle className={titleClasses}>{listing.title}</CardTitle>
              {!isSmall && (
                <>
                  <CardDescription className="leading-normal mb-4">
                    {truncateText(listing.description, 200)}
                  </CardDescription>
                  {showIcons && <ListingIcons listing={listing} />}
                </>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }

  // Complex Card
  const { complex } = props;
  const isVertical = variant === "vertical";

  const containerClasses = cn("w-full max-w-7xl mx-auto px-4 my-8", className);

  const cardClasses = cn(
    "relative m-0 flex",
    isVertical ? "flex-col" : "flex-col md:flex-row",
  );

  const imageContainerClasses = cn(
    "flex-shrink-0",
    isVertical ? "w-full" : "w-full md:w-1/3",
  );

  const photo =
    complex.main_photo_medium ||
    (complex.main_photo
      ? complex.main_photo.image.url
      : complex.listings?.length > 0
        ? complex.listings[0].photos[0]
        : "");

  return (
    <div className={containerClasses}>
      <Link to={Routes.listing_complex_path(complex.slug)}>
        <Card className={cardClasses}>
          <div className={imageContainerClasses}>
            <img
              loading="lazy"
              alt={complex.name}
              className="w-full h-full object-cover dark:opacity-80"
              src={photo}
            />
          </div>
          <CardContent className="flex-1 p-6 w-full md:w-2/3">
            <CardTitle className="mb-3">{complex.name}</CardTitle>
            <CardDescription className="leading-normal">
              {truncateText(complex.description, 200)}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
