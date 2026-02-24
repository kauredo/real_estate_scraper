import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { cn } from "@/utils/functions";

interface ContentCardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  linkUrl: string;
  action?: ReactNode;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
}

/**
 * Generic content card for blog posts, stories, articles, etc.
 * Provides a consistent layout with image, title, description, and optional action button
 */
export default function ContentCard({
  title,
  description,
  image,
  imageAlt,
  linkUrl,
  action,
  className,
  imageClassName,
  contentClassName,
}: ContentCardProps) {
  return (
    <Card className={cn("w-full h-full flex flex-col", className)}>
      <Link to={linkUrl} className="block">
        {image ? (
          <img
            loading="lazy"
            className={cn(
              "w-full rounded-t-lg aspect-video object-cover",
              imageClassName,
            )}
            src={image}
            alt={imageAlt || title}
          />
        ) : (
          <ImagePlaceholder className="w-full rounded-t-lg aspect-video" />
        )}
      </Link>
      <CardContent
        className={cn("p-5 flex flex-col flex-grow", contentClassName)}
      >
        <Link to={linkUrl}>
          <CardTitle className="text-xl mb-2 hover:text-beige-default dark:hover:text-beige-medium transition-colors">
            {title}
          </CardTitle>
        </Link>
        <CardDescription className="mb-4 flex-grow whitespace-pre-line">
          {description}
        </CardDescription>
        {action && <CardFooter className="p-0 pt-0">{action}</CardFooter>}
      </CardContent>
    </Card>
  );
}
